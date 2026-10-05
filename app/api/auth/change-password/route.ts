import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, getCurrentUser, hashPassword, verifyPassword } from "@/lib/auth";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  try {
    const body = await request.json().catch(() => ({}));
    const currentPassword = String(body?.currentPassword || "");
    const newPassword = String(body?.newPassword || "");

    if (!currentPassword || !newPassword || newPassword.length < 8 || newPassword.length > 128) {
      return NextResponse.json(
        { error: "VALIDATION", message: "বর্তমান পাসওয়ার্ড দিন এবং নতুন পাসওয়ার্ড ৮–১২৮ অক্ষরের হতে হবে।" },
        { status: 400 }
      );
    }
    if (currentPassword === newPassword) {
      return NextResponse.json(
        { error: "VALIDATION", message: "নতুন পাসওয়ার্ডটি বর্তমান পাসওয়ার্ড থেকে আলাদা হতে হবে।" },
        { status: 400 }
      );
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { passwordHash: true },
    });
    if (!dbUser || !verifyPassword(currentPassword, dbUser.passwordHash)) {
      return NextResponse.json({ error: "INVALID_PASSWORD", message: "বর্তমান পাসওয়ার্ড সঠিক নয়।" }, { status: 401 });
    }

    const passwordHash = hashPassword(newPassword);
    await prisma.$transaction([
      prisma.user.update({ where: { id: user.id }, data: { passwordHash } }),
      prisma.session.deleteMany({ where: { userId: user.id } }),
    ]);

    await createSession(user.id);
    return NextResponse.json({ data: { ok: true }, message: "পাসওয়ার্ড পরিবর্তন হয়েছে।" });
  } catch {
    return NextResponse.json({ error: "DATABASE_ERROR", message: "পাসওয়ার্ড পরিবর্তন করা যায়নি।" }, { status: 503 });
  }
}
