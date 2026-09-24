import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("password hashing (scrypt)", () => {
  it("verifies a correct password", () => {
    const h = hashPassword("correct-horse-123");
    expect(verifyPassword("correct-horse-123", h)).toBe(true);
  });
  it("rejects a wrong password", () => {
    const h = hashPassword("correct-horse-123");
    expect(verifyPassword("wrong-password", h)).toBe(false);
  });
  it("produces unique salts", () => {
    expect(hashPassword("same")).not.toBe(hashPassword("same"));
  });
  it("never throws on malformed input", () => {
    expect(verifyPassword("x", "")).toBe(false);
    expect(verifyPassword("x", "no-colon-here")).toBe(false);
    expect(verifyPassword("x", "short:zz")).toBe(false);
  });
});
