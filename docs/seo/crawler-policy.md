# Crawler Policy

Owner: Hive Vault Arc  
Implemented: 2026-09-13  
Source: `src/app/robots.ts`

## Search and user-request retrieval

The public site allows normal search crawling and user-request retrieval. This includes Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, and Applebot.

These crawlers may access public resources while `/admin/` and `/api/private/` remain disallowed. CDN and WAF configuration must not challenge legitimate verified crawlers.

## Model training

GPTBot, ClaudeBot, and Google-Extended are denied by default. A company policy owner can enable them with this server-side production setting:

```ini
AI_TRAINING_CRAWL_POLICY=allow
```

Any other value, an empty value, or an absent variable keeps model-training crawling denied. Search and user-request retrieval remain enabled independently.

Google-Extended does not control Google Search inclusion or ranking. It is governed separately from Googlebot.

## Optional machine-readable resources

`llms.txt` and `llms-full.txt` remain public auxiliary resources and are not treated as Google ranking requirements. `/ai/company` is a canonical, indexable HTML company profile and is included in the XML sitemap. `/ai/company.json` preserves the structured resource but is excluded from the sitemap and marked `noindex` so it does not compete with the HTML profile.

## Security boundary

`robots.txt` is a voluntary crawler directive, not access control. Preview, administrative, private API, secret, and customer-data surfaces must be protected by authentication and hosting controls.

## Change approval

Changing model-training access requires a company owner to record:

- decision date;
- approved policy;
- accountable owner;
- legal or privacy review when required;
- production verification result.

Company operations must use organization-controlled accounts, never personal accounts.
