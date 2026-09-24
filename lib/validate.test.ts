import { describe, expect, it } from "vitest";
import {
  isValidBdPhone,
  isValidEmail,
  normalizeEmail,
  requireString,
  optionalString,
} from "./validate";

describe("isValidBdPhone", () => {
  it("accepts 01XXXXXXXXX mobiles", () => {
    expect(isValidBdPhone("01812345678")).toBe(true);
    expect(isValidBdPhone("+8801812345678")).toBe(true);
    expect(isValidBdPhone("8801812345678")).toBe(true);
    expect(isValidBdPhone("01812-345678")).toBe(true);
  });
  it("accepts national hotline 999", () => {
    expect(isValidBdPhone("999")).toBe(true);
  });
  it("rejects bad numbers", () => {
    expect(isValidBdPhone("01234567890")).toBe(false); // 012 invalid series
    expect(isValidBdPhone("0181234567")).toBe(false); // too short
    expect(isValidBdPhone("abc")).toBe(false);
    expect(isValidBdPhone("")).toBe(false);
  });
});

describe("email helpers", () => {
  it("validates emails", () => {
    expect(isValidEmail("a@b.co")).toBe(true);
    expect(isValidEmail("name.one+x@example.com.bd")).toBe(true);
    expect(isValidEmail("no-at-sign")).toBe(false);
    expect(isValidEmail("a@b")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
  it("normalizes email", () => {
    expect(normalizeEmail("  Test@Example.COM ")).toBe("test@example.com");
    expect(normalizeEmail("")).toBe(null);
    expect(normalizeEmail(null)).toBe(null);
    expect(normalizeEmail(123)).toBe(null);
  });
});

describe("string helpers", () => {
  it("requireString trims and enforces length", () => {
    expect(requireString("  hi ", "x")).toBe("hi");
    expect(() => requireString("", "x")).toThrow();
    expect(() => requireString("toolong", "x", 1, 3)).toThrow();
    expect(() => requireString(5, "x")).toThrow();
  });
  it("optionalString caps length", () => {
    expect(optionalString(null)).toBe(null);
    expect(optionalString("")).toBe(null);
    expect(optionalString("abcdef", 3)).toBe("abc");
  });
});
