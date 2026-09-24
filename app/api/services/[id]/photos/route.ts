import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

const MAX_BYTES = 2 * 1024 * 1024; // 2MB
const MAX_PHOTOS = 5;
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

async function canManage(serviceId: string, userId: string, role: string) {
  if (role === "ADMIN") return true;
  const s = await prisma.service.findUnique({
    where: { id: serviceId },
    select: { claimedById: true, createdById: true },
  });
  return !!s && (s.claimedById === userId || s.createdById === userId);
}

/** তালিকার ছবি (পাবলিক)। */
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const data = await prisma.servicePhoto.findMany({
      where: { serviceId: id },
      orderBy: { sortOrder: "asc" },
    });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
}

/** ছবি আপলোড — মালিক/জমাদানকারী/অ্যাডমিন। multipart `file`। */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "UPLOAD_NOT_CONFIGURED", message: "ছবি আপলোড এখনো চালু হয়নি।" },
      { status: 503 }
    );
  }
  const { id } = await params;
  try {
    if (!(await canManage(id, user.id, user.role))) {
      return NextResponse.json(
        { error: "FORBIDDEN", message: "শুধু তালিকার মালিক ছবি যোগ করতে পারে।" },
        { status: 403 }
      );
    }
    const count = await prisma.servicePhoto.count({ where: { serviceId: id } });
    if (count >= MAX_PHOTOS) {
      return NextResponse.json(
        { error: "LIMIT", message: `সর্বোচ্চ ${MAX_PHOTOS}টি ছবি দেওয়া যাবে।` },
        { status: 400 }
      );
    }
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "VALIDATION", message: "ছবি ফাইল দিন।" }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json(
        { error: "VALIDATION", message: "শুধু JPG/PNG/WebP ছবি চলবে।" },
        { status: 400 }
      );
    }
    if (file.size > MAX_BYTES || file.size === 0) {
      return NextResponse.json(
        { error: "VALIDATION", message: "ছবি 2MB-এর মধ্যে হতে হবে।" },
        { status: 400 }
      );
    }
    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const blob = await put(`services/${id}/${Date.now()}.${ext}`, file, { access: "public" });
    const data = await prisma.servicePhoto.create({
      data: { serviceId: id, url: blob.url, sortOrder: count },
    });
    return NextResponse.json({ data }, { status: 201 });
  } catch (e) {
    if ((e as { code?: string })?.code === "P2025") {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "SERVER_ERROR", message: "আপলোড ব্যর্থ হয়েছে।" },
      { status: 500 }
    );
  }
}

/** ছবি মুছুন — `?photoId=`। */
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  const { id } = await params;
  const photoId = new URL(request.url).searchParams.get("photoId");
  if (!photoId) return NextResponse.json({ error: "VALIDATION" }, { status: 400 });
  try {
    if (!(await canManage(id, user.id, user.role))) {
      return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
    }
    const photo = await prisma.servicePhoto.findFirst({ where: { id: photoId, serviceId: id } });
    if (!photo) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    await prisma.servicePhoto.delete({ where: { id: photoId } });
    await del(photo.url).catch(() => undefined);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
}
