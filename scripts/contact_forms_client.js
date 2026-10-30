(() => {
  const selector = "form.framer-txifz4, form.framer-vswvir";
  const email = "contact@hivevaultarc.com";
  const french = document.documentElement.lang.startsWith("fr");
  const isUpdates = (form) => form.classList.contains("framer-vswvir");

  function prepare(form) {
    const label = isUpdates(form)
      ? (french ? "DEMANDER DES NOUVELLES" : "REQUEST UPDATES BY EMAIL")
      : (french ? "OUVRIR UN BROUILLON" : "OPEN EMAIL DRAFT");
    form.action = `mailto:${email}`;
    form.method = "post";
    form.enctype = "text/plain";
    form.querySelectorAll('button[type="submit"]').forEach((button) => {
      button.setAttribute("aria-label", label);
      button.querySelectorAll("span").forEach((span) => {
        if (span.textContent !== label) span.textContent = label;
      });
    });
    if (!form.querySelector("[data-hva-contact-note]")) {
      const note = document.createElement("p");
      note.dataset.hvaContactNote = "";
      note.setAttribute("role", "status");
      note.style.cssText = "font:inherit;font-size:12px;line-height:1.5;margin:8px 0 0;width:100%;grid-column:1 / -1;opacity:.8";
      note.append(document.createTextNode(french
        ? "Ouvre votre messagerie : envoyez le brouillon depuis celle-ci. Contact : "
        : "Opens your email app; send the draft there. Contact: "));
      const link = document.createElement("a");
      link.href = `mailto:${email}`;
      link.textContent = email;
      note.append(link);
      form.append(note);
    }
  }

  function apply(root) {
    if (root.nodeType === 3) root = root.parentElement;
    if (!root) return;
    const form = root.closest?.(selector);
    if (form) prepare(form);
    root.querySelectorAll?.(selector).forEach(prepare);
  }

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.matches(selector)) return;
    // Capture before Framer's inherited form handler. Opening a composer does
    // not send a message or claim a successful server submission.
    event.preventDefault();
    event.stopImmediatePropagation();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const fields = [];
    for (const input of form.elements) {
      if (!input.name || input.disabled || input.closest('[aria-hidden="true"]') || input.tabIndex < 0) continue;
      if (["hidden", "password", "file", "submit", "button", "reset"].includes(input.type)) continue;
      if (["checkbox", "radio"].includes(input.type) && !input.checked) continue;
      if (String(input.value || "").trim()) fields.push(`${input.name}: ${input.value}`);
    }
    const subject = isUpdates(form) ? "HVA updates request" : "HVA project inquiry";
    const body = (isUpdates(form) ? "I would like to hear about Hive Vault Arc updates.\n\n" : "") + fields.join("\n\n");
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, true);

  apply(document);
const observerOptions={childList:true,characterData:true,subtree:true};
const observer=new MutationObserver(records=>{
  const roots=new Set();
  for(const record of records){
    let root=record.target.nodeType===3?record.target.parentElement:record.target;
    if(!root||!root.isConnected)continue;
    root=root.closest?.("form.framer-txifz4, form.framer-vswvir")||root;
    roots.add(root);
  }
  const work=[...roots].filter(root=>{
    for(let parent=root.parentElement;parent;parent=parent.parentElement)if(roots.has(parent))return false;
    return true;
  });
  observer.disconnect();
  try{work.forEach(apply);}finally{observer.observe(document.documentElement,observerOptions);}
});
observer.observe(document.documentElement,observerOptions);
})();
