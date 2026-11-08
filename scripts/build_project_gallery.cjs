// Generated assets are checked in so the static Python preview needs no build step.
const esbuild = require('esbuild');
esbuild.buildSync({
  entryPoints: ['scripts/gallery/project-gallery.jsx'],
  outfile: 'public/assets/js/hva-project-gallery.js',
  bundle: true, minify: true, format: 'esm', target: ['es2020'],
  jsx: 'automatic', define: {'process.env.NODE_ENV': '"production"'},
  legalComments: 'eof'
});
