"""Lightweight local preview of the prepared export; no bundler or file watcher."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit, unquote

PUBLIC = Path(__file__).resolve().parent / 'public'

class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC), **kwargs)

    def translate_path(self, path):
        resolved = Path(super().translate_path(path))
        clean = unquote(urlsplit(path).path)
        if not resolved.exists() and not Path(clean).suffix:
            candidate = Path(str(resolved) + '.html')
            if candidate.is_file():
                return str(candidate)
        return str(resolved)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

if __name__ == '__main__':
    print('HVA preview: http://localhost:3000 — Ctrl+C to stop', flush=True)
    ThreadingHTTPServer(('127.0.0.1', 3000), Handler).serve_forever()
