export function requireString(v: unknown, name: string, min = 1, max = 200): string {
  if (typeof v !== "string") throw new Error(`${name} required`);
  const s = v.trim();
  if (s.length < min || s.length > max) throw new Error(`${name} length invalid`);
  return s;
}

export function optionalString(v: unknown, max = 500): string | null {
  if (v == null || v === "") return null;
  if (typeof v !== "string") return null;
  return v.trim().slice(0, max);
}

export function isValidBdPhone(phone: string): boolean {
  const p = phone.replace(/[\s-]/g, "");
  return /^(?:\+?88)?01[3-9]\d{8}$/.test(p) || p === "999";
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 120;
}

/** ইমেইল normalize — ছোট হাত + trim (ডুপ্লিকেট অ্যাকাউন্ট রোধে)। */
export function normalizeEmail(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const e = v.trim().toLowerCase();
  return e ? e : null;
}
