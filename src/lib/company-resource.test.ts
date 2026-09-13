import { describe, expect, it, vi } from "vitest";

vi.mock("./blog", () => ({ getAllPosts: vi.fn().mockResolvedValue([]) }));
vi.mock("./capabilities", () => ({
  getAllCapabilityProfiles: vi.fn().mockResolvedValue([]),
}));
vi.mock("./employee-profiles", () => ({
  getAllEmployeeProfiles: vi.fn().mockResolvedValue([]),
}));
vi.mock("./insights", () => ({
  getAllNewsArticles: vi.fn().mockResolvedValue([]),
  getAllResearchReports: vi.fn().mockResolvedValue([]),
}));
vi.mock("./perspectives", () => ({
  getAllPerspectives: vi.fn().mockResolvedValue([]),
}));
vi.mock("./proof", () => ({
  getAllCaseStudies: vi.fn().mockResolvedValue([]),
}));

import { COMPANY_ENTITY_FACTS } from "./entity-facts";
import { getCompanyResource } from "./company-resource";

describe("company resource", () => {
  it("uses canonical company facts and never emits a preview hostname", async () => {
    const body = await getCompanyResource();
    const serialized = JSON.stringify(body);

    expect(body).toMatchObject({
      schemaVersion: "2.0",
      canonicalResource: "https://hivevaultarc.com/ai/company",
      structuredResource: "https://hivevaultarc.com/ai/company.json",
      company: {
        name: COMPANY_ENTITY_FACTS.publicBrandName,
        website: COMPANY_ENTITY_FACTS.canonicalWebsite,
        email: COMPANY_ENTITY_FACTS.publicEmail,
        telephone: COMPANY_ENTITY_FACTS.publicPhoneE164,
        languages: COMPANY_ENTITY_FACTS.supportedLanguages,
        marketsServed: COMPANY_ENTITY_FACTS.marketsServed,
      },
      governance: {
        entityFactReviewStatus: COMPANY_ENTITY_FACTS.review.status,
      },
    });
    expect(serialized).not.toContain("hive-vault-arc-website.vercel.app");
    expect(serialized).not.toContain("hiva-nine.vercel.app");
  });
});
