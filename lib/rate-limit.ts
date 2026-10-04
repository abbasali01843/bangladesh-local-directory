/** Rate limiter — Upstash Redis (REST) থাকলে distributed, না থাকলে in-memory।
 * Vercel-এ KV/Upstash বসালে env (`UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`)
 * দিলেই স্বয়ংক্রিয়ভাবে শক্তিশালী মোডে যাবে; কোড বদলাতে হবে না।
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

function memoryLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const cur = buckets.get(key);
  if (!cur || cur.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1 };
  }
  if (cur.count >= limit) return { ok: false, remaining: 0 };
  cur.count += 1;
  return { ok: true, remaining: limit - cur.count };
}

async function redisLimit(key: string, limit: number, windowMs: number) {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const res = await fetch(`${url}/incr/${encodeURIComponent("rl:" + key)}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!res.ok) return null;
  const j = (await res.json()) as { result?: number };
  const count = Number(j.result) || 1;
  if (count === 1) {
    await fetch(
      `${url}/expire/${encodeURIComponent("rl:" + key)}/${Math.ceil(windowMs / 1000)}`,
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
    ).catch(() => undefined);
  }
  return count > limit
    ? { ok: false, remaining: 0 }
    : { ok: true, remaining: limit - count };
}

export async function rateLimit(
  key: string,
  limit = 20,
  windowMs = 60_000
): Promise<{ ok: boolean; remaining: number }> {
  try {
    const r = await redisLimit(key, limit, windowMs);
    if (r) return r;
  } catch {
    // Redis ব্যর্থ হলে memory fallback
  }
  return memoryLimit(key, limit, windowMs);
}

export function clientIp(request: Request): string {
  // Vercel sets x-real-ip at the edge; prefer it over client-supplied forwarding headers.
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  // When only a proxy chain is available, use the last hop (the nearest proxy),
  // not the first value which may have been supplied by the client.
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const hops = forwarded.split(",");
    const lastHop = hops[hops.length - 1]?.trim();
    if (lastHop) return lastHop;
  }
  return "unknown";
}
