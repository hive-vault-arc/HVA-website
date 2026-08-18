# Library Rewrite Briefs

These are editorial drafts, not approved production copy. Every quantitative claim must
be checked against a primary source before publication.

## NVIDIA RTX Spark

**Working title:** `What Local AI Hardware Changes - and What It Does Not`

**Direct answer:** Local AI hardware can improve privacy and latency. It does not remove
the need for workload design, model governance, security, or lifecycle operations.

**Key takeaways:**

- Start with workload fit: model size, memory, latency, availability, and power.
- Compare total operating cost, not device price alone.
- Treat local inference as one deployment option inside a wider architecture.
- Verify every product specification and availability claim from NVIDIA and Microsoft.

**Evidence needed:** official product documentation, supported-model matrix, security
architecture, measured benchmark conditions, and publication dates.

**CTA:** Discuss the operating challenge.

## Agentic AI

**Working title:** `Where AI Agents Earn a Place in Operations`

**Direct answer:** An AI agent is useful when it owns a narrow workflow, can use approved
tools, and has clear escalation and review rules.

**Key takeaways:**

- Choose repetitive workflows with measurable delay, cost, or error.
- Define the owner and exception path before deployment.
- Separate model capability from production reliability.
- Pilot one workflow and review outcomes before expanding scope.

**Remove:** market-size urgency, unsupported Morocco adoption rankings, universal ROI
claims, and language implying that delay is always failure.

**CTA:** Map one candidate workflow.

## Application Onboarding

**Working title:** `Onboarding Is an Operating System, Not a Tour`

**Direct answer:** Onboarding improves when each step proves value, asks for only necessary
input, and leaves the user with one clear next action.

**Key takeaways:**

- Measure activation around a real user outcome.
- Remove fields and steps that do not support that outcome.
- Instrument where users stop and what they expected next.
- Test changes against retained behavior, not click-through alone.

**Evidence needed:** source definitions for activation and retention, sample context, test
duration, and limits on applying consumer-app benchmarks to B2B products.

**CTA:** Review the first-value workflow.

## Custom Software

**Working title:** `When Custom Software Is the Right Operating Decision`

**Direct answer:** Custom software is justified when a material workflow, control, or
integration cannot be handled cleanly by a standard platform.

**Key takeaways:**

- Prefer configuration when the process is standard.
- Build only where differentiation or control matters.
- Include maintenance, security, and ownership in the decision.
- Define the operating constraint before discussing architecture.

**Remove:** the absolute claim that custom software outperforms packaged software.

**CTA:** Test the build-versus-buy case.

## AI Adoption

**Working title:** `A Practical Test for AI Adoption`

**Direct answer:** Adopt AI where a specific workflow can improve under defined controls.
Adoption itself is not a strategy.

**Key takeaways:**

- Name the workflow and its current performance.
- Define which decisions remain human-owned.
- Set quality, cost, and response-time thresholds.
- Stop or redesign the pilot when thresholds are not met.

**Remove:** "every company," "must," "now," broad market forecasts, and unsupported job or
ROI conclusions.

**CTA:** Assess one workflow.

## WhatsApp Morocco Industry Guide

**Working title:** `WhatsApp AI Operations in Morocco: A Buyer’s Guide`

**Direct answer:** A WhatsApp AI system should qualify, route, and record conversations
while escalating sensitive, uncertain, or high-value cases to a person.

**Required sections:** suitable workflows, Arabic/French/English requirements, consent and
data handling, CRM integration, escalation, measurement, vendor questions, and a 90-day
pilot outline. Do not publish pricing or market-penetration figures without approved
sources.

## Research Report Holds

The three report pairs remain visible until the owner approves a separate production
decision. Replacement briefs must include:

1. Research question and scope.
2. Population, sample, dates, and collection method.
3. Metric definitions and calculation method.
4. Primary sources or approved client evidence.
5. Reviewer and conflict disclosure.
6. Limitations and transferability.
7. Reproducible tables or coded calculations.

Until those requirements are met, label them internally as `Evidence requirements
pending`; do not present them as original benchmarks or indexes.

## French Migration Notes

- Translate only after the English source is approved.
- Preserve meaning, evidence limits, links, and CTA intent.
- Keep product names and stable taxonomy keys unchanged.
- Use French editorial review for terminology and sentence rhythm.
- Do not auto-publish generated translations.
