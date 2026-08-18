# Insights Image Manifest

## Delivery Standard

- Editorial master: `2400 x 1350` WebP, quality 90-94.
- Open Graph derivative: `1200 x 630` WebP.
- Target for major photographic covers: approximately `250-600 KB`.
- Use exact final aspect ratios. Validate desktop, mobile, card, and social crops.
- Record role, caption, credit, rights, evidence status, AI disclosure, prompt record,
  crop, and hotspot in Sanity when the Studio schema is available.
- Do not generate statistics, client proof, founder portraits, readable interfaces, or
  fake research.

## New Local Editorial Covers

| Topic asset family                      | Role                                     | Source                                                                 | Rights / disclosure                               | Status                 |
| --------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------- | ---------------------- |
| `ai-operational-systems-*`              | AI operations topic cover                | OpenAI image generation; macro translucent network and signal pathways | AI-generated editorial illustration; not evidence | Ready for local review |
| `custom-software-automation-*`          | Software and automation topic cover      | OpenAI image generation; modular glass pathways                        | AI-generated editorial illustration; not evidence | Ready for local review |
| `real-estate-construction-*`            | Real estate and construction topic cover | OpenAI image generation; architectural material study                  | AI-generated editorial illustration; not evidence | Ready for local review |
| `morocco-north-africa-transformation-*` | Morocco and North Africa topic cover     | OpenAI image generation; abstract regional contours and craft geometry | AI-generated editorial illustration; not evidence | Ready for local review |
| `data-cloud-reliability-*`              | Data, cloud, and reliability topic cover | OpenAI image generation; protected optical core and ordered fibers     | AI-generated editorial illustration; not evidence | Ready for local review |

Each family contains a `2400 x 1350` WebP master and a `1200 x 630` Open Graph
derivative. Masters use WebP quality 94 and range from approximately 273-429 KB. The
prompt constraints prohibit text, logos, UI, dashboards, statistics, people, robots,
and invented research. Topic imagery is used for editorial navigation, publication
cards, and non-case article covers; it must never be presented as client proof.

## Existing Cover Decision

Current Sanity cover originals are approximately 29-99 KB and are too small for reliable
large-format editorial use. The local frontend uses the approved topic image family as a
non-case display fallback without changing CMS assets. Do not upscale or republish old
covers. Any permanent CMS replacement still requires source, rights, disclosure, and crop
approval.
