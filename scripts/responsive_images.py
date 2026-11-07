"""Generate real variants for Framer scale-down-to URLs. Requires Pillow."""
import hashlib,io,json,re
from pathlib import Path
from urllib.parse import parse_qs
from PIL import Image,ImageOps
ROOT=Path(__file__).resolve().parents[1]; PUBLIC=ROOT/'public'
URL=re.compile(r'(?<![A-Za-z0-9_./:-])(?:\.{1,2}/|/)?assets/images/(?P<name>[A-Za-z0-9_-]+\.(?:png|jpg|jpeg|webp))\?(?P<query>(?:scale-down-to|width|height)=\d+(?:(?:&amp;|&)(?:scale-down-to|width|height)=\d+)*)')
def main():
    out=PUBLIC/'assets/optimized'; out.mkdir(exist_ok=True)
    cache={}; variants={}; changed=[]; missing=set(); replacements=0
    def replace(m):
        nonlocal replacements
        q=parse_qs(m['query'].replace('&amp;','&'))
        if 'scale-down-to' not in q: return m[0]
        source=PUBLIC/'assets/images'/m['name']; edge=int(q['scale-down-to'][0])
        if not source.is_file(): missing.add(m['name']); return m[0]
        if edge not in {512,1024,2048,4096}: return m[0]
        key=(m['name'],edge)
        if key not in cache:
            original=source.read_bytes()
            with Image.open(io.BytesIO(original)) as im:
                if getattr(im,'is_animated',False): cache[key]=None; return m[0]
                im=ImageOps.exif_transpose(im)
                if im.mode not in {'RGB','RGBA'}: im=im.convert('RGBA' if 'transparency' in im.info else 'RGB')
                im.thumbnail((edge,edge),Image.Resampling.LANCZOS)
                buffer=io.BytesIO(); im.save(buffer,format='WEBP',quality=90,method=6,icc_profile=im.info.get('icc_profile',b''))
                payload=buffer.getvalue(); name=hashlib.sha256(payload).hexdigest()[:20]+'.webp'; target=out/name
                if not target.exists(): target.write_bytes(payload)
                with Image.open(target) as check:
                    check.load(); assert check.size==im.size and max(check.size)<=edge
                    if im.mode=='RGBA': assert check.getchannel('A').tobytes()==im.getchannel('A').tobytes()
                cache[key]='/assets/optimized/'+name
                variants[str(key)]=dict(source=source.relative_to(PUBLIC).as_posix(),edge=edge,width=im.width,height=im.height,source_bytes=len(original),variant_bytes=len(payload),url=cache[key])
        result=cache[key]
        if result: replacements+=1; return result
        return m[0]
    for path in sorted(PUBLIC.rglob('*')):
        if path.suffix not in {'.html','.js','.mjs','.css'} or not path.is_file(): continue
        text=path.read_bytes().decode('utf-8'); updated=URL.sub(replace,text)
        if updated!=text:
            old=URL.sub('__LOCAL_IMAGE_URL__',text)
            new=re.sub(r'/assets/optimized/[0-9a-f]{20}\.webp','__LOCAL_IMAGE_URL__',updated)
            assert old==URL.sub('__LOCAL_IMAGE_URL__',new), 'Non-image content changed: '+str(path)
            path.write_bytes(updated.encode('utf-8')); changed.append(path.relative_to(ROOT).as_posix())
    report=dict(changed_files=changed,replacements=replacements,variants=list(variants.values()),missing_source_images=sorted(missing),binary_cms='Preserved unchanged; binary CMS may still supply original image URLs.',quality='WebP quality 90, Lanczos resize, alpha preserved; visual QA pending.')
    (ROOT/'plans/sprint-2-images.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(dict(changed_files=len(changed),replacements=replacements,variants=len(variants),missing_source_images=len(missing)),indent=2))
if __name__=='__main__': main()
