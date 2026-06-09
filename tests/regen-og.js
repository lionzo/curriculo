/**
 * Regenerates assets/og-image.png from assets/og-image.svg.
 *
 * Rodar (a partir de tests/):  node regen-og.js
 *
 * Renderiza o SVG no Chromium em 1200×630 e AGUARDA a fonte Inter
 * (importada via @import no SVG) carregar antes do screenshot — é isso
 * que evita o render com fonte de fallback (texto com métricas erradas).
 * Requer rede para buscar a fonte do Google Fonts.
 */

const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const svg = 'file://' + path.resolve(__dirname, '../assets/og-image.svg');
  const out = path.resolve(__dirname, '../assets/og-image.png');

  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  await page.goto(svg, { waitUntil: 'networkidle' });
  try { await page.evaluate(() => document.fonts.ready); } catch (e) { /* sem document.fonts: segue */ }
  await page.waitForTimeout(400);

  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  await browser.close();
  console.log('✓ og-image.png regenerado (1200×630):', out);
})();
