const fs = require('fs');
const path = require('path');

const assetsDir = path.join(process.cwd(), 'dist', 'client', 'assets');
const outFile = path.join(process.cwd(), 'dist', 'client', 'index.html');

if (!fs.existsSync(assetsDir)) {
  console.warn('No assets directory found at', assetsDir);
  process.exit(0);
}

const files = fs.readdirSync(assetsDir);
const css = files.find((f) => f.startsWith('styles-') && f.endsWith('.css'));
const indexJs = files.filter((f) => f.startsWith('index-') && f.endsWith('.js'));

const cssLink = css ? `<link rel="stylesheet" href="/assets/${css}" />` : '';
const scripts = indexJs
  .map((f) => `<script type="module" src="/assets/${f}"></script>`)
  .join('\n    ');

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>IPL 2026 Predictions</title>
    ${cssLink}
  </head>
  <body>
    <div id="root"></div>
    ${scripts}
  </body>
</html>`;

fs.writeFileSync(outFile, html, 'utf8');
console.log('Wrote', outFile);
