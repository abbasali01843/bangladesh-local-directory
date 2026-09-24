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
