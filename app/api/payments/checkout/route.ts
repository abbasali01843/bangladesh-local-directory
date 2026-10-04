import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createGatewaySession, PROMOTION_PLANS, type PromotionPlanKey } from "@/lib/sslcommerz";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  const limit = await rateLimit(`payment-checkout:${user.id}`, 5, 10 * 60 * 1000);
  if (!limit.success) return NextResponse.json({ error: "RATE_LIMITED" }, { status: 429 });
  try {
    const body = await request.json() as { serviceId?: string; plan?: string };
    const plan = body.plan as PromotionPlanKey;
    if (!body.serviceId || !Object.hasOwn(PROMOTION_PLANS, plan)) {
      return NextResponse.json({ error: "INVALID_CHECKOUT" }, { status: 400 });
    }
    const service = await prisma.service.findFirst({
      where: { id: body.serviceId, status: "APPROVED", OR: [{ createdById: user.id }, { claimedById: user.id }] },
      select: { id: true, name: true },
    });
    if (!service) return NextResponse.json({ error: "SERVICE_NOT_OWNED_OR_APPROVED" }, { status: 403 });
    const customer = await prisma.user.findUnique({ where: { id: user.id }, select: { name: true, email: true, phone: true } });
    if (!customer?.email || !customer.phone) {
      return NextResponse.json({ error: "PROFILE_CONTACT_REQUIRED" }, { status: 400 });
    }
    const transactionId = `PL${Date.now().toString(36)}${randomBytes(6).toString("hex")}`.slice(0, 30);
    const order = await prisma.paymentOrder.create({
      data: { userId: user.id, serviceId: service.id, plan, amount: PROMOTION_PLANS[plan].amount, transactionId },
    });
    try {
      const session = await createGatewaySession({
        transactionId, amount: PROMOTION_PLANS[plan].amount,
        customerName: customer.name, customerEmail: customer.email, customerPhone: customer.phone,
        serviceName: service.name,
      });
      await prisma.paymentOrder.update({
        where: { id: order.id }, data: { gatewaySessionKey: session.sessionKey },
      });
      return NextResponse.json({ checkoutUrl: session.gatewayUrl });
    } catch (error) {
      await prisma.paymentOrder.update({ where: { id: order.id }, data: { status: "FAILED" } });
      throw error;
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "CHECKOUT_FAILED";
    const status = message === "PAYMENT_GATEWAY_NOT_CONFIGURED" || message === "SITE_URL_NOT_CONFIGURED" ? 503 : 502;
    return NextResponse.json({ error: status === 503 ? message : "CHECKOUT_FAILED" }, { status });
  }
}
