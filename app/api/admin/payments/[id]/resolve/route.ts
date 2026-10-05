import { NextResponse } from "next/server";
import { getCurrentUser, requireAdmin } from "@/lib/auth";
import { resolveReviewedOrder } from "@/lib/sslcommerz";

/** অ্যাডমিন REVIEW অর্ডার approve/reject — POST { action: "approve" | "reject" } */
export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!requireAdmin(user)) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  let action: string;
  try {
    action = String((await request.json())?.action || "");
  } catch {
    return NextResponse.json({ error: "VALIDATION" }, { status: 400 });
  }
  if (action !== "approve" && action !== "reject") {
    return NextResponse.json({ error: "VALIDATION", message: "action approve বা reject হতে হবে।" }, { status: 400 });
  }
  try {
    const result = await resolveReviewedOrder(id, action);
    if (!result.ok) return NextResponse.json({ error: result.status }, { status: 409 });
    return NextResponse.json({ data: result });
  } catch {
    return NextResponse.json({ error: "DATABASE_NOT_CONFIGURED" }, { status: 503 });
  }
}
