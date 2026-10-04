import { describe, expect, it } from "vitest";
import { hasValidImageSignature } from "./upload-validation";

describe("hasValidImageSignature", () => {
  it("accepts matching JPEG, PNG and WebP headers", () => {
    expect(hasValidImageSignature("image/jpeg", new Uint8Array([0xff, 0xd8, 0xff, 0x00]))).toBe(true);
    expect(hasValidImageSignature("image/png", new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))).toBe(true);
    expect(hasValidImageSignature("image/webp", new Uint8Array([0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50]))).toBe(true);
  });

  it("rejects spoofed MIME types and truncated headers", () => {
    expect(hasValidImageSignature("image/png", new Uint8Array([0xff, 0xd8, 0xff]))).toBe(false);
    expect(hasValidImageSignature("image/jpeg", new Uint8Array([0xff, 0xd8]))).toBe(false);
    expect(hasValidImageSignature("text/html", new Uint8Array([0x3c, 0x68, 0x74, 0x6d, 0x6c]))).toBe(false);
  });
});
