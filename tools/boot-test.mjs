// BrewCraft boot test.
// Run with: npm run boot
// Loads index.html in a simulated browser (jsdom), runs its scripts,
// and verifies the app initializes without runtime errors.
// Requires the jsdom dev dependency: npm install

import fs from 'node:fs';
import path from 'node:path';
import { JSDOM, VirtualConsole } from 'jsdom';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const errors = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => errors.push(e.message));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'https://laanani92.github.io/BrewCraft/',
  virtualConsole: vc,
  pretendToBeVisual: true
});

const d = dom.window.document;

setTimeout(() => {
  let failures = 0;
  const fail = (m) => { console.log('  ✗ ' + m); failures++; };
  const ok = (m) => console.log('  ✓ ' + m);

  console.log('BrewCraft boot test\n');

  if (errors.length) errors.forEach(e => fail('runtime error: ' + e));
  else ok('no runtime errors during boot');

  const checks = [
    ['six tab panels mounted', () => d.querySelectorAll('.tab-panel').length === 6],
    ['Today tab is active on load', () => d.getElementById('tab-today')?.classList.contains('active')],
    ['version label populated', () => /\d+\.\d+\.\d+/.test(d.getElementById('appVersion')?.textContent || '')],
    ['recipe library seeded', () => dom.window.localStorage.getItem('brewcraft_seeded') === '1'],
    ['Brew Bar rendered', () => (d.getElementById('bbDose')?.textContent || '') !== ''],
    ['scan button present (camera OCR)', () => !!d.getElementById('scanBagBtn')],
    ['no boot-error banner', () => !d.getElementById('bootError')]
  ];
  for (const [name, fn] of checks) {
    try { fn() ? ok(name) : fail(name); }
    catch (e) { fail(name + ' — threw: ' + e.message); }
  }

  console.log('\n' + (failures ? `FAILED — ${failures} issue(s)` : 'Boots clean.'));
  process.exit(failures ? 1 : 0);
}, 400);
