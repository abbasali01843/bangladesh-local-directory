import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSession, verifyPassword } from "@/lib/auth";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = clientIp(request);
  const rl = await rateLimit(`login:${ip}`, 10, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "RATE_LIMIT", message: "অনেকবার চেষ্টা করেছেন। একটু পর আবার চেষ্টা করুন।" },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const raw = String(body?.identifier || "").trim();
    // ইমেইলে লগইন করলে lowercase-এ মিলবে (রেজিস্টারে normalize করা থাকে)
    const identifier = raw.includes("@") ? raw.toLowerCase() : raw;
    const password = String(body?.password || "");
    if (!identifier || !password || password.length > 128) {
      return NextResponse.json({ error: "VALIDATION", message: "ইমেইল/মোবাইল ও পাসওয়ার্ড দিন" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { phone: identifier }],
      },
    });
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: "INVALID", message: "ভুল ইমেইল/মোবাইল বা পাসওয়ার্ড" }, { status: 401 });
    }
    await createSession(user.id);
    return NextResponse.json({
      data: { id: user.id, name: user.name, role: user.role },
    });
  } catch {
    return NextResponse.json(
      { error: "DATABASE_NOT_CONFIGURED", message: "ডাটাবেস সেট নেই — লগইন পরে চালু হবে" },
      { status: 503 }
    );
  }
}
