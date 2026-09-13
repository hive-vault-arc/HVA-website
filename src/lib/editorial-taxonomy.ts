export const EDITORIAL_FORMATS = [
  "operating-note",
  "evidence-brief",
  "industry-guide",
  "case",
  "founder-view",
] as const;

export type EditorialFormat = (typeof EDITORIAL_FORMATS)[number];

export const EDITORIAL_TOPICS = [
  "ai-operational-systems",
  "custom-software-automation",
  "real-estate-construction",
  "morocco-north-africa-transformation",
  "data-cloud-reliability",
] as const;

export type EditorialTopic = (typeof EDITORIAL_TOPICS)[number];

export const EDITORIAL_TOPIC_IMAGES: Record<EditorialTopic, string> = {
  "ai-operational-systems":
    "/Images/insights/editorial/ai-operational-systems-2400x1350.webp",
  "custom-software-automation":
    "/Images/insights/editorial/custom-software-automation-2400x1350.webp",
  "real-estate-construction":
    "/Images/insights/editorial/real-estate-construction-2400x1350.webp",
  "morocco-north-africa-transformation":
    "/Images/insights/editorial/morocco-north-africa-transformation-2400x1350.webp",
  "data-cloud-reliability":
    "/Images/insights/editorial/data-cloud-reliability-2400x1350.webp",
};

export function getEditorialTopicImage(
  topics: readonly EditorialTopic[] | undefined,
  fallback?: string,
) {
  // Sanity remains the source of truth. Topic art is only a fallback for records
  // that do not yet have a CMS cover image.
  return fallback ?? topics?.map((topic) => EDITORIAL_TOPIC_IMAGES[topic]).find(Boolean);
}

export type EditorialPerson = {
  name: string;
  role?: string;
  initials?: string;
};

export type EditorialLink = {
  label: string;
  href: string;
};

export type EditorialEvidenceLink = {
  label: string;
  url: string;
  claimIds?: string[];
};

export type EditorialContentFields = {
  editorialFormat?: EditorialFormat;
  topics?: EditorialTopic[];
  answerQuestion?: string;
  directAnswer?: string;
  keyTakeaways?: string[];
  answerEvidence?: EditorialEvidenceLink[];
  relatedQuestions?: string[];
  lastReviewed?: string;
  evidenceType?: string;
  reviewers?: EditorialPerson[];
  relatedCases?: EditorialLink[];
  relatedCapabilities?: EditorialLink[];
  methodology?: string;
  limitations?: string;
  primaryCta?: EditorialLink;
};

type LegacyEditorialRecord = Required<
  Pick<EditorialContentFields, "editorialFormat" | "topics">
> &
  Pick<EditorialContentFields, "directAnswer" | "evidenceType" | "primaryCta">;

const DEFAULT_CTA: EditorialLink = {
  label: "Discuss the operating challenge",
  href: "/contact",
};

const LEGACY_EDITORIAL_MAP: Record<string, LegacyEditorialRecord> = {
  "agentic-ai-autonomous-revolution": {
    editorialFormat: "operating-note",
    topics: ["ai-operational-systems", "morocco-north-africa-transformation"],
    evidenceType: "External research synthesis",
    directAnswer:
      "AI agents create value when they own a narrow workflow, use approved tools, and operate inside clear review controls.",
    primaryCta: DEFAULT_CTA,
  },
  "custom-digital-solutions-business-transformation": {
    editorialFormat: "operating-note",
    topics: ["custom-software-automation"],
    evidenceType: "Operating perspective",
    directAnswer:
      "Custom software is useful when it removes a specific operating constraint that standard tools cannot resolve cleanly.",
    primaryCta: DEFAULT_CTA,
  },
  "app-onboarding-conversion-revenue": {
    editorialFormat: "evidence-brief",
    topics: ["custom-software-automation"],
    evidenceType: "External research synthesis",
    directAnswer:
      "Onboarding improves when each step proves value, asks for only necessary input, and gives users a clear next action.",
    primaryCta: DEFAULT_CTA,
  },
  "whatsapp-ai-chatbot-morocco-business-guide": {
    editorialFormat: "industry-guide",
    topics: ["ai-operational-systems", "morocco-north-africa-transformation"],
    evidenceType: "Market guide",
    directAnswer:
      "A WhatsApp AI system should qualify, route, and record conversations while keeping sensitive or uncertain cases under human review.",
    primaryCta: DEFAULT_CTA,
  },
  "why-companies-must-integrate-ai-agents-2025": {
    editorialFormat: "operating-note",
    topics: ["ai-operational-systems", "morocco-north-africa-transformation"],
    evidenceType: "External research synthesis",
    directAnswer:
      "Companies should adopt AI where a measurable workflow can be improved, not because adoption itself is a strategy.",
    primaryCta: DEFAULT_CTA,
  },
  "nvidia-rtx-spark-local-ai-superchip-private-agents": {
    editorialFormat: "evidence-brief",
    topics: ["ai-operational-systems", "data-cloud-reliability"],
    evidenceType: "Product and source review",
    directAnswer:
      "Local AI hardware can improve privacy and latency, but its value depends on workload fit, model support, security, and operating cost.",
    primaryCta: DEFAULT_CTA,
  },
  "consulting-engineering-one-loop": {
    editorialFormat: "operating-note",
    topics: ["custom-software-automation", "data-cloud-reliability"],
    evidenceType: "Operating perspective",
    directAnswer:
      "Transformation works better when strategy, engineering, and operations share one owner and one review loop.",
    primaryCta: DEFAULT_CTA,
  },
  "fix-the-workflow-before-ai": {
    editorialFormat: "operating-note",
    topics: ["ai-operational-systems", "custom-software-automation"],
    evidenceType: "Operating perspective",
    directAnswer:
      "Fix ownership, decisions, and exceptions before adding AI. Automation will otherwise scale the same broken workflow.",
    primaryCta: DEFAULT_CTA,
  },
  "multilingual-whatsapp-ai-agent": {
    editorialFormat: "case",
    topics: ["ai-operational-systems", "morocco-north-africa-transformation"],
    evidenceType: "Approved client case",
    primaryCta: DEFAULT_CTA,
  },
  "top-tier-crm-transformation-program-real-estate-operations": {
    editorialFormat: "case",
    topics: ["real-estate-construction", "custom-software-automation"],
    evidenceType: "Approved client case",
    primaryCta: DEFAULT_CTA,
  },
  "premium-advice-training-keepzen-digital-academy": {
    editorialFormat: "case",
    topics: ["custom-software-automation"],
    evidenceType: "Approved client case",
    primaryCta: DEFAULT_CTA,
  },
  "tarik-rami-immobilier": {
    editorialFormat: "case",
    topics: ["real-estate-construction", "custom-software-automation"],
    evidenceType: "Approved client case",
    primaryCta: DEFAULT_CTA,
  },
  "consulting-and-engineering-one-loop": {
    editorialFormat: "evidence-brief",
    topics: ["custom-software-automation", "data-cloud-reliability"],
    evidenceType: "Evidence requirements pending",
    primaryCta: DEFAULT_CTA,
  },
  "hidden-cost-fragmented-operations": {
    editorialFormat: "evidence-brief",
    topics: ["custom-software-automation", "data-cloud-reliability"],
    evidenceType: "Evidence requirements pending",
    primaryCta: DEFAULT_CTA,
  },
  "transformation-velocity-from-governance": {
    editorialFormat: "evidence-brief",
    topics: ["custom-software-automation", "data-cloud-reliability"],
    evidenceType: "Evidence requirements pending",
    primaryCta: DEFAULT_CTA,
  },
  "ai-operations-benchmark-response-conversion": {
    editorialFormat: "evidence-brief",
    topics: ["ai-operational-systems"],
    evidenceType: "Evidence requirements pending",
    primaryCta: DEFAULT_CTA,
  },
  "digital-transformation-execution-patterns-mid-market": {
    editorialFormat: "evidence-brief",
    topics: [
      "morocco-north-africa-transformation",
      "custom-software-automation",
    ],
    evidenceType: "Evidence requirements pending",
    primaryCta: DEFAULT_CTA,
  },
  "cloud-reliability-readiness-index-2026": {
    editorialFormat: "evidence-brief",
    topics: ["data-cloud-reliability"],
    evidenceType: "Evidence requirements pending",
    primaryCta: DEFAULT_CTA,
  },
};

export function isEditorialFormat(value: unknown): value is EditorialFormat {
  return EDITORIAL_FORMATS.includes(value as EditorialFormat);
}

export function isEditorialTopic(value: unknown): value is EditorialTopic {
  return EDITORIAL_TOPICS.includes(value as EditorialTopic);
}

function normalizeTopics(value: unknown): EditorialTopic[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((topic) => {
    const candidate =
      typeof topic === "string"
        ? topic
        : topic && typeof topic === "object" && "key" in topic
          ? (topic as { key?: unknown }).key
          : undefined;

    return isEditorialTopic(candidate) ? [candidate] : [];
  });
}

export function resolveEditorialFields(
  slug: string,
  input: Partial<EditorialContentFields> = {},
): EditorialContentFields {
  const legacy = LEGACY_EDITORIAL_MAP[slug];
  const topics = normalizeTopics(input.topics);

  return {
    ...(legacy ?? {}),
    ...input,
    editorialFormat: isEditorialFormat(input.editorialFormat)
      ? input.editorialFormat
      : legacy?.editorialFormat,
    topics: topics.length > 0 ? topics : (legacy?.topics ?? []),
    directAnswer: input.directAnswer?.trim() || legacy?.directAnswer,
    evidenceType: input.evidenceType?.trim() || legacy?.evidenceType,
    primaryCta: input.primaryCta?.label?.trim()
      ? input.primaryCta
      : legacy?.primaryCta,
  };
}
