import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, hashPassword } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { isValidBdPhone } from "@/lib/validate";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rl = rateLimit(`register:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "RATE_LIMIT", message: "অনেকবার চেষ্টা করেছেন। একটু পর আবার চেষ্টা করুন।" },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const name = String(body?.name || "").trim();
    const password = String(body?.password || "");
    const email = body?.email ? String(body.email).trim() : null;
    const phone = body?.phone ? String(body.phone).trim() : null;

    if (!name || name.length < 2) {
      return NextResponse.json({ error: "VALIDATION", message: "নাম দিন" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "VALIDATION", message: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষর" }, { status: 400 });
    }
    if (!email && !phone) {
      return NextResponse.json({ error: "VALIDATION", message: "ইমেইল বা মোবাইল দিন" }, { status: 400 });
    }
    if (phone && !isValidBdPhone(phone)) {
      return NextResponse.json({ error: "VALIDATION", message: "সঠিক মোবাইল নম্বর দিন" }, { status: 400 });
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [...(email ? [{ email }] : []), ...(phone ? [{ phone }] : [])],
      },
    });
    if (existing) {
      return NextResponse.json({ error: "EXISTS", message: "ইমেইল/মোবাইল ইতিমধ্যে ব্যবহৃত" }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash: hashPassword(password),
        role: "USER",
      },
    });
    await createSession(user.id);
    return NextResponse.json({ data: { id: user.id, name: user.name, role: user.role } }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "DATABASE_NOT_CONFIGURED", message: "ডাটাবেস সেট নেই — রেজিস্ট্রেশন পরে চালু হবে" },
      { status: 503 }
    );
  }
}
