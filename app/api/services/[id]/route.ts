import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { categories, subOf } from "@/data/categories";
import { isValidBdPhone } from "@/lib/validate";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  const { id } = await params;

  try {
    const existing = await prisma.service.findUnique({
      where: { id },
      select: { id: true, createdById: true, claimedById: true, status: true },
    });
    if (!existing) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    const canEdit = user.role === "ADMIN" || existing.createdById === user.id || existing.claimedById === user.id;
    if (!canEdit) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

    const body = await request.json();
    const name = String(body.name || "").trim();
    const categoryId = String(body.categoryId || "").trim();
    const districtId = String(body.districtId || "").trim();
    const upazilaId = String(body.upazilaId || "").trim();
    const subcategory = body.subcategory ? String(body.subcategory).trim() : null;
    const phone = body.phone ? String(body.phone).trim() : null;
    const email = body.email ? String(body.email).trim().toLowerCase() : null;

    if (name.length < 2 || name.length > 120 || !categoryId || !districtId || !upazilaId)
      return NextResponse.json({ error: "VALIDATION_ERROR", message: "নাম, ক্যাটাগরি, জেলা ও উপজেলা আবশ্যক।" }, { status: 400 });
    const category = categories.find(c => c.id === categoryId);
    if (!category || (subcategory && !subOf(categoryId, subcategory)))
      return NextResponse.json({ error: "VALIDATION_ERROR", message: "ক্যাটাগরি/সাব-ক্যাটাগরি সঠিক নয়।" }, { status: 400 });
    if (phone && !isValidBdPhone(phone))
      return NextResponse.json({ error: "VALIDATION_ERROR", message: "সঠিক মোবাইল নম্বর দিন।" }, { status: 400 });
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return NextResponse.json({ error: "VALIDATION_ERROR", message: "সঠিক ইমেইল দিন।" }, { status: 400 });

    const up = await prisma.upazila.findUnique({ where: { id: upazilaId }, select: { id: true, districtId: true } });
    if (!up || up.districtId !== districtId)
      return NextResponse.json({ error: "VALIDATION_ERROR", message: "জেলা/উপজেলা সঠিক নয়।" }, { status: 400 });

    let unionId = body.unionId ? String(body.unionId) : null;
    let areaId = body.areaId ? String(body.areaId) : null;
    if (unionId) {
      const union = await prisma.union.findUnique({ where: { id: unionId }, select: { id: true, upazilaId: true } });
      if (!union || union.upazilaId !== upazilaId)
        return NextResponse.json({ error: "VALIDATION_ERROR", message: "ইউনিয়ন সঠিক নয়।" }, { status: 400 });
      if (areaId) {
        const area = await prisma.area.findUnique({ where: { id: areaId }, select: { id: true, unionId: true } });
        if (!area || area.unionId !== unionId)
          return NextResponse.json({ error: "VALIDATION_ERROR", message: "এলাকা সঠিক নয়।" }, { status: 400 });
      }
    } else areaId = null;

    const data = await prisma.service.update({
      where: { id },
      data: {
        name, categoryId, subcategory, districtId, upazilaId, unionId, areaId, phone, email,
        address: body.address ? String(body.address).trim().slice(0, 300) : null,
        description: body.description ? String(body.description).trim().slice(0, 2000) : null,
        ...(user.role === "ADMIN" ? {} : { status: "PENDING" }),
      },
    });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "SERVER_ERROR", message: "তথ্য আপডেট করা যায়নি।" }, { status: 500 });
  }
}