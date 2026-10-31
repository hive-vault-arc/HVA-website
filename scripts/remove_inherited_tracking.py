"""Audit/remove inherited Facebook and X tracking snippets from exported pages.
Run python scripts/remove_inherited_tracking.py --apply. Does not delete assets.
"""
import argparse,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
BLOCKS={
 'facebook': re.compile(r'<!-- Meta Pixel Code -->[\s\S]*?<!-- End Meta Pixel Code -->'),
 'x': re.compile(r'<!-- X conversion tracking base code -->[\s\S]*?<!-- End X conversion tracking base code -->'),
}
PROTECTED=re.compile(r'<(?:video|svg|form|input|button)\b[^>]*>')

def clean(text):
    updated=text; removed={}
    for name,pattern in BLOCKS.items():
        matches=list(pattern.finditer(updated))
        if len(matches)>1: raise ValueError('Unexpected repeated tracking block: '+name)
        removed[name]=[m[0] for m in matches]
        updated=pattern.sub('',updated)
    assert PROTECTED.findall(text)==PROTECTED.findall(updated),'Interaction/media markup changed'
    # Only complete marked snippets are removed; runtime and all other bytes remain.
    expected=text
    for pattern in BLOCKS.values(): expected=pattern.sub('',expected)
    assert updated==expected
    assert not any(p.search(updated) for p in BLOCKS.values())
    return updated,removed

def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--apply',action='store_true');args=parser.parse_args()
    pages=[];pending=[]
    for path in sorted((ROOT/'public').rglob('*.html')):
        raw=path.read_bytes();text=raw.decode('utf-8');updated,removed=clean(text)
        assert clean(updated)[0]==updated,'Not idempotent'
        assert not re.search(r'<script\b[^>]*src="[^"]*(?:fbevents|uwt-|986096630920970)',updated)
        assert "twq('config'" not in updated and 'facebook.com/tr?id=986096630920970' not in updated
        if text!=updated:
            pending.append((path,updated.encode('utf-8')))
            pages.append(dict(page=path.relative_to(ROOT/'public').as_posix(),removed_bytes=len(raw)-len(updated.encode('utf-8')),blocks={k:len(v) for k,v in removed.items()}))
    if args.apply:
        for path,payload in pending:path.write_bytes(payload)
    report=dict(applied=args.apply,changed_pages=len(pages),removed_html_bytes=sum(p['removed_bytes'] for p in pages),pages=pages,scope='Only marked inherited Meta Pixel and X tracking blocks removed. Original assets, Framer runtime and checkout embed preserved.')
    if pages:
        (ROOT/'plans/sprint-3-tracking.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({k:v for k,v in report.items() if k!='pages'},indent=2))
if __name__=='__main__':main()
