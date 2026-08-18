# Insights Migration Inventory

Read-only snapshot of the production dataset on 2026-08-14. Each row represents one
English source and its approved French counterpart, for 30 retained documents total.
No production record was changed.

| Type | Stable slug | English document | French document | Proposed format | Topic keys | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Case study | `multilingual-whatsapp-ai-agent` | `gg7RnZRpI6fQeqXVUf1Mrt` | `03675e9f-95ec-4ea2-ae95-06f9eba205c5` | `case` | `ai-operational-systems`, `morocco-north-africa-transformation` | Retain approved proof; add provenance fields |
| Case study | `premium-advice-training-keepzen-digital-academy` | `gobPlfpfIs8bjVPFSCHwe6` | `a7b9a005-d4d3-47f4-9561-04b9c2eec97b` | `case` | `custom-software-automation` | Retain approved proof; add provenance fields |
| Case study | `tarik-rami-immobilier` | `oCp2KJ15s65qjchemknqVG` | `eemCLxt78eTOywYRUTjmM2` | `case` | `real-estate-construction`, `custom-software-automation` | Retain approved proof; add provenance fields |
| Case study | `top-tier-crm-transformation-program-real-estate-operations` | `IuK2abzZBGOYd51ySRR7RH` | `7fd0dd13-f7a2-4481-9e39-5778c49fa6e8` | `case` | `real-estate-construction`, `custom-software-automation` | Retain approved proof; add provenance fields |
| News article | `nvidia-rtx-spark-local-ai-superchip-private-agents` | `gg7RnZRpI6fQeqXVUf17Rb` | `7f58e4dd-8ec8-4ae1-8a29-8fa4d68013ec` | `evidence-brief` | `ai-operational-systems`, `data-cloud-reliability` | Rewrite claims; verify product sources and dates |
| Perspective | `consulting-engineering-one-loop` | `IuK2abzZBGOYd51ySRR4tL` | `3d60c23c-097a-4e1f-ab36-a640b0519e79` | `operating-note` | `custom-software-automation`, `data-cloud-reliability` | Retain; add direct answer and one CTA |
| Perspective | `fix-the-workflow-before-ai` | `C9kRM0yIrVzAHS6D3EimQS` | `8d05a7a4-3e11-4bae-9a2f-8b208ac0bc18` | `operating-note` | `ai-operational-systems`, `custom-software-automation` | Retain; tighten and add review metadata |
| Post | `agentic-ai-autonomous-revolution` | `gg7RnZRpI6fQeqXVUf0jQW` | `34022346-e4f6-4b91-bdf5-cb1aa6e1bb74` | `operating-note` | `ai-operational-systems`, `morocco-north-africa-transformation` | Rewrite with restrained claims |
| Post | `app-onboarding-conversion-revenue` | `IuK2abzZBGOYd51ySRQRhv` | `b05970d3-b08a-4fe8-b47a-e63fb9369500` | `evidence-brief` | `custom-software-automation` | Rewrite headline and evidence chain |
| Post | `custom-digital-solutions-business-transformation` | `C9kRM0yIrVzAHS6D3Ehr95` | `f0d253c2-ca26-44f4-9ca4-f8a8b3fd0a31` | `operating-note` | `custom-software-automation` | Rewrite absolute comparison claim |
| Post | `whatsapp-ai-chatbot-morocco-business-guide` | `gg7RnZRpI6fQeqXVUf10ju` | `1ecb890a-0e9e-4588-a311-35c070185978` | `industry-guide` | `ai-operational-systems`, `morocco-north-africa-transformation` | Rework as practical market guide |
| Post | `why-companies-must-integrate-ai-agents-2025` | `IuK2abzZBGOYd51ySRR22p` | `db0a0e04-03e6-4bb7-ae12-c8e910daa952` | `operating-note` | `ai-operational-systems`, `morocco-north-africa-transformation` | Replace urgency framing with workflow criteria |
| Research report | `ai-operations-benchmark-response-conversion` | `C9kRM0yIrVzAHS6D3Eis3x` | `943c2990-bc7a-4363-8513-59276d0378e2` | `evidence-brief` | `ai-operational-systems` | Hold; methodology, sample, sources, and limitations missing |
| Research report | `cloud-reliability-readiness-index-2026` | `C9kRM0yIrVzAHS6D3EitwS` | `36a67edb-c7b5-41ba-ab36-090437f688d2` | `evidence-brief` | `data-cloud-reliability` | Hold; scoring model, sample, sources, and limitations missing |
| Research report | `digital-transformation-execution-patterns-mid-market` | `gg7RnZRpI6fQeqXVUf1Oye` | `89157fb9-12d0-41d5-b47b-a8d5eefd877d` | `evidence-brief` | `morocco-north-africa-transformation`, `custom-software-automation` | Hold; sample definition, evidence, and limitations missing |

## Migration Rules

- Keep slugs, `_id` values, translation groups, routes, and approved source evidence.
- Draft English first. Create French editorial notes only after English approval.
- Do not change the visibility of the three research-report pairs during drafting.
- Do not convert fallback classifications into published CMS values without review.
- Record author, reviewer, rights, credit, and generation disclosure before publication.
