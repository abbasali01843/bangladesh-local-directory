import { NextResponse } from "next/server";
import { settleVerifiedPayment } from "@/lib/sslcommerz";

type Context = { params: Promise<{ status: string }> };

export async function POST(request: Request, context: Context) {
  const { status } = await context.params;
  const form = await request.formData();
  const valId = String(form.get("val_id") || "");
  const transactionId = String(form.get("tran_id") || "");
  const sessionKey = String(form.get("sessionkey") || "") || undefined;
  if (status === "success" && valId) {
    try { await settleVerifiedPayment(valId, transactionId || undefined, sessionKey); } catch { /* IPN retries can complete settlement */ }
  }
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "https://bangladesh-local-directory.vercel.app";
  const target = status === "success" ? "success" : status === "cancel" ? "cancelled" : "failed";
  return NextResponse.redirect(new URL(`/owner?payment=${target}`, origin.startsWith("http") ? origin : `https://${origin}`), 303);
}
