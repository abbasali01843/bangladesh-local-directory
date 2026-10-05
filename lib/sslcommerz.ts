import { prisma } from "@/lib/prisma";

export const PROMOTION_PLANS = {
  BASIC: { amount: 299, days: 30, label: "বেসিক" },
  FEATURED: { amount: 799, days: 30, label: "ফিচার্ড" },
  PREMIUM: { amount: 1499, days: 30, label: "প্রিমিয়াম" },
} as const;

export type PromotionPlanKey = keyof typeof PROMOTION_PLANS;

function gatewayConfig() {
  const storeId = process.env.SSLCOMMERZ_STORE_ID;
  const storePassword = process.env.SSLCOMMERZ_STORE_PASSWORD;
  if (!storeId || !storePassword) throw new Error("PAYMENT_GATEWAY_NOT_CONFIGURED");
  const sandbox = process.env.SSLCOMMERZ_SANDBOX !== "false";
  const base = sandbox ? "https://sandbox.sslcommerz.com" : "https://securepay.sslcommerz.com";
  return { storeId, storePassword, base };
}

function siteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (!value) throw new Error("SITE_URL_NOT_CONFIGURED");
  const url = new URL(value.startsWith("http") ? value : `https://${value}`);
  if (url.protocol !== "https:" && process.env.NODE_ENV === "production") throw new Error("HTTPS_REQUIRED");
  return url.origin;
}

export async function createGatewaySession(input: {
  transactionId: string;
  amount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceName: string;
}) {
  const config = gatewayConfig();
  const origin = siteUrl();
  const body = new URLSearchParams({
    store_id: config.storeId,
    store_passwd: config.storePassword,
    total_amount: input.amount.toFixed(2),
    currency: "BDT",
    tran_id: input.transactionId,
    success_url: `${origin}/api/payments/return/success`,
    fail_url: `${origin}/api/payments/return/fail`,
    cancel_url: `${origin}/api/payments/return/cancel`,
    ipn_url: `${origin}/api/payments/ipn`,
    cus_name: input.customerName.slice(0, 50),
    cus_email: input.customerEmail,
    cus_add1: "Bangladesh",
    cus_city: "Chattogram",
    cus_country: "Bangladesh",
    cus_phone: input.customerPhone,
    product_name: input.serviceName.slice(0, 100),
    product_category: "Business promotion",
    product_profile: "non-physical-goods",
    shipping_method: "NO",
  });
  const response = await fetch(`${config.base}/gwprocess/v4/api.php`, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });
  if (!response.ok) throw new Error("PAYMENT_GATEWAY_UNAVAILABLE");
  const data = await response.json() as { status?: string; GatewayPageURL?: string; sessionkey?: string };
  if (data.status !== "SUCCESS" || !data.GatewayPageURL || !data.sessionkey) {
    throw new Error("PAYMENT_SESSION_CREATION_FAILED");
  }
  const gatewayUrl = new URL(data.GatewayPageURL);
  if (gatewayUrl.protocol !== "https:" || !["sandbox.sslcommerz.com", "securepay.sslcommerz.com"].includes(gatewayUrl.hostname)) {
    throw new Error("INVALID_GATEWAY_REDIRECT");
  }
  return { gatewayUrl: gatewayUrl.toString(), sessionKey: data.sessionkey };
}

export async function validateGatewayPayment(valId: string) {
  const config = gatewayConfig();
  const url = new URL(`${config.base}/validator/api/validationserverAPI.php`);
  url.search = new URLSearchParams({
    val_id: valId,
    store_id: config.storeId,
    store_passwd: config.storePassword,
    format: "json",
  }).toString();
  // NOTE: never log `url` — it contains the store password (SSLCommerz requires GET query auth).
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error("PAYMENT_VALIDATION_UNAVAILABLE");
  return await response.json() as {
    status?: string; tran_id?: string; amount?: string; currency?: string;
    val_id?: string; risk_level?: string; currency_type?: string;
  };
}

/** প্রচার সক্রিয় করা — পেমেন্ট PAID হওয়ার পর settlement ও admin resolve দুটোই এটি ব্যবহার করে। */
async function activatePromotion(order: { id: string; serviceId: string; plan: PromotionPlanKey }, now: Date) {
  const plan = PROMOTION_PLANS[order.plan];
  const endsAt = new Date(now.getTime() + plan.days * 86400000);
  await prisma.promotion.updateMany({
    where: { serviceId: order.serviceId, status: "ACTIVE" },
    data: { status: "REVOKED" },
  });
  await prisma.promotion.create({
    data: { orderId: order.id, serviceId: order.serviceId, plan: order.plan, startsAt: now, endsAt },
  });
}

export async function settleVerifiedPayment(valId: string, expectedTransactionId?: string, sessionKey?: string) {
  const validation = await validateGatewayPayment(valId);
  if (validation.status !== "VALID" || !validation.tran_id || validation.val_id !== valId) {
    return { settled: false, reason: "NOT_VALID" as const };
  }
  const order = await prisma.paymentOrder.findUnique({ where: { transactionId: validation.tran_id } });
  if (!order) return { settled: false, reason: "ORDER_NOT_FOUND" as const };
  if (expectedTransactionId && order.transactionId !== expectedTransactionId) return { settled: false, reason: "TRANSACTION_MISMATCH" as const };
  // IPN/return-এ পাঠানো sessionkey আমাদের তৈরি checkout session-এর সঙ্গে মিলতে হবে।
  if (sessionKey && order.gatewaySessionKey && sessionKey !== order.gatewaySessionKey) {
    return { settled: false, reason: "SESSION_MISMATCH" as const };
  }
  const amount = Number(validation.amount);
  const currency = validation.currency_type || validation.currency;
  if (!Number.isFinite(amount) || Math.abs(amount - Number(order.amount)) > 0.009 || currency !== "BDT") {
    return { settled: false, reason: "AMOUNT_OR_CURRENCY_MISMATCH" as const };
  }
  const riskLevel = Number(validation.risk_level || 0);
  if (riskLevel === 1) {
    // শুধু PENDING অর্ডার REVIEW-তে যায় — REVIEW অর্ডার স্বয়ংক্রিয়ভাবে PAID হবে না;
    // অ্যাডমিন approve/reject করতে হবে (POST /api/admin/payments/[id]/resolve)।
    await prisma.paymentOrder.updateMany({
      where: { id: order.id, paidAt: null, status: "PENDING" },
      data: { status: "REVIEW", validationId: valId, riskLevel },
    });
    return { settled: false, reason: "RISK_REVIEW" as const };
  }
  const now = new Date();
  await prisma.$transaction(async (tx) => {
    // শুধু PENDING থেকে claim — REVIEW অর্ডার এখানে settle হয় না (risk-hold bypass রোধ)।
    const claimed = await tx.paymentOrder.updateMany({
      where: { id: order.id, paidAt: null, status: "PENDING" },
      data: { status: "PAID", paidAt: now, validationId: valId, riskLevel },
    });
    if (claimed.count !== 1) return;
    await tx.promotion.updateMany({ where: { serviceId: order.serviceId, status: "ACTIVE" }, data: { status: "REVOKED" } });
    await tx.promotion.create({
      data: { orderId: order.id, serviceId: order.serviceId, plan: order.plan, startsAt: now, endsAt: new Date(now.getTime() + PROMOTION_PLANS[order.plan].days * 86400000) },
    });
  });
  const updated = await prisma.paymentOrder.findUnique({ where: { id: order.id }, select: { status: true } });
  return { settled: updated?.status === "PAID", reason: updated?.status === "PAID" ? "PAID" as const : "ALREADY_PROCESSED" as const };
}

/** অ্যাডমিন REVIEW অর্ডার resolve — approve হলে প্রচার সক্রিয়, reject হলে CANCELLED (refund ম্যানুয়ালি)। */
export async function resolveReviewedOrder(orderId: string, action: "approve" | "reject") {
  const now = new Date();
  if (action === "reject") {
    const r = await prisma.paymentOrder.updateMany({
      where: { id: orderId, status: "REVIEW", paidAt: null },
      data: { status: "CANCELLED" },
    });
    return { ok: r.count === 1, status: r.count === 1 ? "CANCELLED" as const : "NOT_IN_REVIEW" as const };
  }
  const order = await prisma.paymentOrder.findUnique({ where: { id: orderId } });
  if (!order || order.status !== "REVIEW") return { ok: false, status: "NOT_IN_REVIEW" as const };
  await prisma.$transaction(async (tx) => {
    const claimed = await tx.paymentOrder.updateMany({
      where: { id: orderId, status: "REVIEW", paidAt: null },
      data: { status: "PAID", paidAt: now },
    });
    if (claimed.count !== 1) return;
    await tx.promotion.updateMany({ where: { serviceId: order.serviceId, status: "ACTIVE" }, data: { status: "REVOKED" } });
    await tx.promotion.create({
      data: { orderId: order.id, serviceId: order.serviceId, plan: order.plan, startsAt: now, endsAt: new Date(now.getTime() + PROMOTION_PLANS[order.plan].days * 86400000) },
    });
  });
  return { ok: true, status: "PAID" as const };
}
