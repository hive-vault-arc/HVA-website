import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/company-resource", () => ({
  getCompanyResource: vi.fn().mockResolvedValue({
    schemaVersion: "2.0",
    canonicalResource: "https://hivevaultarc.com/ai/company",
    structuredResource: "https://hivevaultarc.com/ai/company.json",
  }),
}));

import { GET } from "./route";

describe("/ai/company.json", () => {
  it("serves the structured record without competing with the canonical page", async () => {
    const response = await GET();

    expect(response.headers.get("content-type")).toContain("application/json");
    expect(response.headers.get("cache-control")).toBe(
      "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
    );
    expect(response.headers.get("x-robots-tag")).toBe("noindex, follow");
    await expect(response.json()).resolves.toMatchObject({
      canonicalResource: "https://hivevaultarc.com/ai/company",
    });
  });
});
