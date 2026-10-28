(() => {
  const logoSelector = "a.framer-93PRb, footer a.framer-1ph81iu";
  const logoLabel = "Hive Vault Arc home";
  const projectCtaSelector = ".framer-vwyx9i";

  function labelLogoLinks(root) {
    const links = [];
    if (root instanceof Element && root.matches(logoSelector)) links.push(root);
    root.querySelectorAll?.(logoSelector).forEach(link => links.push(link));
    links.forEach(link => {
      if (link.getAttribute("aria-label") !== logoLabel) link.setAttribute("aria-label", logoLabel);
    });
  }

  function labelProjectCtas(root) {
    const ctas = [];
    if (root instanceof Element && root.matches(projectCtaSelector)) ctas.push(root);
    root.querySelectorAll?.(projectCtaSelector).forEach(cta => ctas.push(cta));
    ctas.forEach(cta => {
      const label = document.documentElement.lang.startsWith("fr") ? "Démarrer un projet" : "Start a project";
      if (cta.getAttribute("aria-label") !== label) cta.setAttribute("aria-label", label);
      cta.setAttribute("aria-haspopup", "dialog");
    });
  }

  function updateContactAndCredits(root) {
    const rootElement = root instanceof Element ? root : null;
    const phones = [];
    if (rootElement?.matches("a[href^='tel:']")) phones.push(rootElement);
    root.querySelectorAll?.("a[href^='tel:']").forEach(link => phones.push(link));
    phones.forEach(link => {
      if (/\+1\s*\(555\)\s*123[-\s]?4567/.test(link.textContent || link.getAttribute("href") || "")) link.remove();
    });

    const emails = [];
    if (rootElement?.matches("a[href^='mailto:']")) emails.push(rootElement);
    root.querySelectorAll?.("a[href^='mailto:']").forEach(link => emails.push(link));
    emails.forEach(link => {
      if (/hello@quantumflux\.top/i.test(link.textContent || link.getAttribute("href") || "")) {
        link.href = "mailto:contact@hivevaultarc.com";
        const label = link.querySelector("h2, p");
        if (label) label.textContent = "contact@hivevaultarc.com";
        else link.textContent = "contact@hivevaultarc.com";
      }
    });

    const credits = [];
    if (rootElement?.matches("div.framer-zk9kdz")) credits.push(rootElement);
    root.querySelectorAll?.("div.framer-zk9kdz").forEach(block => credits.push(block));
    credits.forEach(block => {
      if (!/FORDE LAB|FRAMER/i.test(block.textContent || "")) return;
      block.innerHTML = '<div style="display:flex;align-items:center;gap:8px;"><span>Made with love by</span><img src="/assets/images/HVAlogo-header.png" alt="HVA logo" style="display:block;width:auto;height:22px;object-fit:contain;"></div>';
    });
  }

  function applyBranding(root) {
    labelLogoLinks(root);
    labelProjectCtas(root);
    updateContactAndCredits(root);
  }

  applyBranding(document);
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => applyBranding(node)));
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
