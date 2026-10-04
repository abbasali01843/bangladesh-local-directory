import { describe, expect, it } from "vitest";
import { PROMOTION_PLANS } from "@/lib/sslcommerz";

describe("promotion package pricing", () => {
  it("uses the published fixed BDT prices and a 30-day term", () => {
    expect(PROMOTION_PLANS.BASIC).toMatchObject({ amount: 299, days: 30 });
    expect(PROMOTION_PLANS.FEATURED).toMatchObject({ amount: 799, days: 30 });
    expect(PROMOTION_PLANS.PREMIUM).toMatchObject({ amount: 1499, days: 30 });
  });
});
