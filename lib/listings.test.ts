import { describe, expect, it } from "vitest";
import { waNumber, mapsUrl, type ListingView } from "./listings";

describe("waNumber", () => {
  it("converts 01XXXXXXXXX to 880 form", () => {
    expect(waNumber("01812345678")).toBe("8801812345678");
    expect(waNumber("+8801812345678")).toBe("8801812345678");
  });
  it("rejects hotlines and bad input", () => {
    expect(waNumber("999")).toBe(null);
    expect(waNumber("102")).toBe(null);
    expect(waNumber("01234567890")).toBe(null);
    expect(waNumber("")).toBe(null);
  });
});

describe("mapsUrl", () => {
  const base = {
    name: "টেস্ট",
    area: "কাঞ্চনা",
    upazila: "সাতকানিয়া",
    district: "চট্টগ্রাম",
  } as ListingView;
  it("uses coordinates when present", () => {
    expect(mapsUrl({ ...base, latitude: 22.1, longitude: 91.9 })).toContain("22.1,91.9");
  });
  it("falls back to address query", () => {
    expect(mapsUrl({ ...base, latitude: null, longitude: null })).toContain("maps/search");
  });
});
