const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const buildOptions = {
  entryPoints: {
    'content': 'src/index.js',
    'popup/popup': 'src/popup/popup.js'
  },
  outdir: 'dist',
  bundle: true,
  format: 'iife',
  target: ['chrome58'],
};

function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`📄 Copied: ${src} → ${dest}`);
}

esbuild.build(buildOptions).then(() => {
  copyFile('src/popup/popup.html', 'dist/popup/popup.html');
  copyFile('src/popup/style.css', 'dist/popup/style.css');
  copyFile('manifest.json', 'dist/manifest.json');
  copyFile('icons/icon.png', 'dist/icons/icon.png');
  console.log('✅ Build complete');
}).catch(() => process.exit(1));