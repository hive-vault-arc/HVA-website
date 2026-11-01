// Keep preparation order explicit; each step operates on the exported source.
for (const script of [
  "configure_contact_forms.cjs",
  "configure_immoworld_case.cjs",
  "gallery_placeholders.cjs",
  "lazy_homepage_images.cjs",
  "remove_duplicate_preloads.cjs",
  "extract_export_styles.cjs",
  "remove_template_language_links.cjs",
  "configure_site_metadata.cjs",
  "extract_inline_svg.cjs",
  "preload_hero_font.cjs",
  "configure_public_links.cjs",
  "add_skip_links.cjs",
  "configure_scroll_feel.cjs"
]) require("./" + script);
require("./verify_export.cjs");
