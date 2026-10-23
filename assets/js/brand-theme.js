(() => {
  const logoSelector = "a.framer-93PRb, footer a.framer-1ph81iu";
  const logoLabel = "Hive Vault Arc home";
  const projectCtaSelector = ".framer-vwyx9i";

  function labelLogoLinks(root) {
    const links = [];
    if (root instanceof Element && root.matches(logoSelector)) links.push(root);
    root.querySelectorAll?.(logoSelector).forEach(link => links.push(link));

    links.forEach(link => {
      if (link.getAttribute("aria-label") !== logoLabel) {
        link.setAttribute("aria-label", logoLabel);
      }
    });
  }

  function labelProjectCtas(root) {
    const ctas = [];
    if (root instanceof Element && root.matches(projectCtaSelector)) ctas.push(root);
    root.querySelectorAll?.(projectCtaSelector).forEach(cta => ctas.push(cta));

    ctas.forEach(cta => {
      const label = document.documentElement.lang.startsWith("fr")
        ? "Démarrer un projet"
        : "Start a project";
      if (cta.getAttribute("aria-label") !== label) {
        cta.setAttribute("aria-label", label);
      }
      cta.setAttribute("aria-haspopup", "dialog");
    });
  }

  labelLogoLinks(document);
  labelProjectCtas(document);
  new MutationObserver(records => {
    records.forEach(record => {
      record.addedNodes.forEach(node => labelLogoLinks(node));
      record.addedNodes.forEach(node => labelProjectCtas(node));
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
