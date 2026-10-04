import { describe, expect, it } from "vitest";
import { rateLimit } from "./rate-limit";

describe("rateLimit (memory fallback)", () => {
  it("allows under the limit then blocks", async () => {
    const key = "test:" + Math.random();
    expect((await rateLimit(key, 2, 60_000)).ok).toBe(true);
    expect((await rateLimit(key, 2, 60_000)).ok).toBe(true);
    const third = await rateLimit(key, 2, 60_000);
    expect(third.ok).toBe(false);
    expect(third.remaining).toBe(0);
  });
});

describe("clientIp", () => {
  it("prefers the trusted edge IP header", async () => {
    const { clientIp } = await import("./rate-limit");
    const request = new Request("https://example.test", {
      headers: {
        "x-real-ip": "203.0.113.8",
        "x-forwarded-for": "198.51.100.7, 203.0.113.8",
      },
    });
    expect(clientIp(request)).toBe("203.0.113.8");
  });

  it("uses the last proxy hop when the edge IP header is absent", async () => {
    const { clientIp } = await import("./rate-limit");
    const request = new Request("https://example.test", {
      headers: { "x-forwarded-for": "198.51.100.7, 203.0.113.8" },
    });
    expect(clientIp(request)).toBe("203.0.113.8");
  });
});
