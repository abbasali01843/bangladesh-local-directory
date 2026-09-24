import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

/** Next.js-মুক্ত পাসওয়ার্ড হেল্পার — API ও seed/CLI দুটোতেই ব্যবহারযোগ্য। */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return salt + ":" + derived;
}

export function verifyPassword(password: string, stored: string): boolean {
  try {
    const [salt, key] = stored.split(":");
    if (!salt || !key) return false;
    const keyBuf = Buffer.from(key, "hex");
    const derived = scryptSync(password, salt, 64);
    if (derived.length !== keyBuf.length) return false;
    return timingSafeEqual(derived, keyBuf);
  } catch {
    return false;
  }
}
