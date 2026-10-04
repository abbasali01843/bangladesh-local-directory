import { NextResponse } from "next/server";
import { settleVerifiedPayment } from "@/lib/sslcommerz";

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const valId = String(form.get("val_id") || "");
    const transactionId = String(form.get("tran_id") || "");
    if (!valId || !transactionId) return NextResponse.json({ error: "INVALID_NOTIFICATION" }, { status: 400 });
    const result = await settleVerifiedPayment(valId, transactionId);
    if (!result.settled && result.reason !== "ALREADY_PROCESSED" && result.reason !== "RISK_REVIEW") {
      return NextResponse.json({ ok: false, reason: result.reason }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "IPN_PROCESSING_FAILED" }, { status: 503 });
  }
}
