export default function NotFound() {
  const link = {
    display: "inline-block",
    padding: "14px 20px",
    borderRadius: 10,
    fontWeight: 600,
    textDecoration: "none",
  };
  return (
    <main style={{ minHeight: "100svh", boxSizing: "border-box", padding: "clamp(24px, 6vw, 96px)", background: "#0b1726", color: "#fff", fontFamily: "system-ui, sans-serif", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      <div style={{ maxWidth: 640 }}>
        <p style={{ color: "#e8a838", letterSpacing: "0.12em", fontSize: 13, fontWeight: 700 }}>HIVE VAULT ARC</p>
        <p aria-hidden="true" style={{ fontSize: "clamp(80px, 18vw, 150px)", fontWeight: 700, lineHeight: 1, margin: "32px 0 16px", color: "#e8a838" }}>404</p>
        <h1 style={{ fontSize: "clamp(32px, 6vw, 56px)", lineHeight: 1.1, margin: "0 0 20px" }}>Page not found</h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: "#b7c0cc", margin: "0 0 32px" }}>This page may have moved, or the address may be incorrect. You can return home or get in touch with HVA.</p>
        <nav aria-label="Page recovery links" style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <a href="/" style={{ ...link, background: "#e8a838", color: "#0b1726", border: "1px solid #e8a838" }}>Back to home</a>
          <a href="/contacts" style={{ ...link, color: "#fff", border: "1px solid #637084" }}>Contact HVA</a>
        </nav>
        <p style={{ marginTop: 24 }}><a href="/fr" lang="fr" style={{ color: "#b7c0cc", textUnderlineOffset: 4 }}>Accueil en fran�ais</a></p>
      </div>
    </main>
  );
}

