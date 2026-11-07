# Export size comparison — 31 October 2026

These are local file measurements and consistent Brotli quality-5 estimates, not a Lighthouse run, observed Vercel transfer sizes, or browser loading times.

Baseline: original export commit d894689. Current: locally prepared export with the development build transformations.

| Measurement | Original | Prepared export |
| --- | ---: | ---: |
| Homepage HTML, raw bytes | 6,847,399 | 4,110,445 |
| Homepage HTML, estimated Brotli bytes | 316,440 | 184,878 |
| Homepage HTML plus newly extracted CSS/SVG, raw bytes | 6,847,399 | 5,444,497 |
| Homepage HTML plus newly extracted CSS/SVG, estimated Brotli bytes | 316,440 | 314,532 |
| Redundant homepage module-preload tags | 59 | 0 |

The document itself is 40% smaller. However, the stylesheet and SVG still need to be fetched on a first visit. Including those separate files, the compressed markup payload is roughly unchanged. Extraction chiefly enables reuse of shared files across pages and avoids repeated inline parsing/markup. Unchanged HTML can also be revalidated with HTTP 304, so this is not a blanket repeat-visit transfer claim.

The original 59 redundant JavaScript preloads pointed to 4,464,099 bytes of source, estimated at 836,643 Brotli-compressed bytes across the individual files. These were copies of modules imported from different animation URLs. Removing those preload requests is a more substantial first-visit network improvement than the HTML-size percentage alone suggests. Actual transfer savings depend on which speculative requests the browser completes.

Extracted homepage files measured:
- CSS: 1,128,345 raw bytes; 106,393 estimated Brotli bytes.
- SVG: 205,707 raw bytes; 23,261 estimated Brotli bytes.

Image, font, video and required runtime transfers are excluded from the markup table. HTTP overhead, compression settings, cache state, CPU cost, hydration, paint timing and user interaction latency are not measured here.

Still required: comparable desktop/mobile browser profiling on the stable dev Preview. Keep the approved slow/smooth scrolling, retain the hero video for now, and preserve the live hivevaultarc.com site.
