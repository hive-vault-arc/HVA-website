"""Run python scripts/sprint1.py [--apply]. No third-party dependencies."""
import argparse, hashlib, json, re
from pathlib import Path
from urllib.parse import unquote, urlsplit
ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public'
STYLE = re.compile(r'(<style\b[^>]*>)([\s\S]*?)(</style>)')
REF = re.compile(r'\b(?:src|href|poster)="([^"#]+)"')

def optimize(text):
    originals = {m[2].strip() for m in STYLE.finditer(text) if 'data-framer-css-ssr-minified=' in m[1]}
    removed = []
    def replace(m):
        if 'data-framer-breakpoints=' in m[1] and len(m[2]) > 100_000 and m[2].strip() in originals:
            removed.append(len(m[2].encode('utf-8')))
            return m[1] + m[3]  # Keep marker for runtime selectors.
        return m[0]
    updated = STYLE.sub(replace, text)
    assert STYLE.sub('', text) == STYLE.sub('', updated), 'Non-style content changed'
    assert {m[2].strip() for m in STYLE.finditer(text) if m[2].strip()} == {m[2].strip() for m in STYLE.finditer(updated) if m[2].strip()}, 'Unique CSS changed'
    return updated, removed

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--apply', action='store_true')
    args = parser.parse_args()
    pages = []
    for path in sorted(PUBLIC.rglob('*.html')):
        data = path.read_bytes(); text = data.decode('utf-8')
        updated, removed = optimize(text)
        assert optimize(updated)[0] == updated, 'Not idempotent'
        missing = set()
        for match in REF.finditer(text):
            url = urlsplit(match[1].replace('&amp;', '&'))
            if url.scheme or url.netloc or not url.path: continue
            target = PUBLIC / unquote(url.path).lstrip('/') if url.path.startswith('/') else path.parent / unquote(url.path)
            if not target.exists(): missing.add(url.path)
        output = updated.encode('utf-8')
        if args.apply and removed: path.write_bytes(output)
        pages.append(dict(page=path.relative_to(PUBLIC).as_posix(),before_bytes=len(data),after_bytes=len(output),removed_css_bytes=sum(removed),sha256_before=hashlib.sha256(data).hexdigest(),sha256_after=hashlib.sha256(output).hexdigest(),missing_direct_references=sorted(missing)))
    report = dict(mode='applied' if args.apply else 'audit',pages=pages,total_removed_css_bytes=sum(p['removed_css_bytes'] for p in pages),changed_pages=sum(p['removed_css_bytes']>0 for p in pages),limitation='Direct HTML src/href/poster only; excludes srcset, CSS and runtime references.')
    out = ROOT / 'plans' / ('sprint-1-results.json' if args.apply else 'current-source-audit.json')
    out.write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({k:v for k,v in report.items() if k!='pages'},indent=2))
if __name__ == '__main__': main()
