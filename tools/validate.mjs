// BrewCraft static validator.
// Run with: npm run validate
// Ports the static checks used throughout the project's development.
// Exits non-zero if anything fails, so it can gate a commit.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

let failures = 0;
const fail = (msg) => { console.log('  ✗ ' + msg); failures++; };
const ok = (msg) => console.log('  ✓ ' + msg);

// Pull the main inline script (the largest <script> block).
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const script = scripts.sort((a, b) => b.length - a.length)[0] || '';
const markup = html.replace(/<script>[\s\S]*?<\/script>/g, '');

console.log('BrewCraft validator\n');

// 1. JavaScript parses.
console.log('JavaScript syntax');
try {
  new vm.Script(script);
  ok('main script parses');
} catch (e) {
  fail('syntax error: ' + e.message);
}

// 2. Every getElementById target exists in the markup (minus known runtime-injected ids).
console.log('\nElement ID audit');
const KNOWN_DYNAMIC = new Set(['bootError']);
const idsUsed = new Set([...script.matchAll(/getElementById\('([^']+)'\)/g)].map(m => m[1]));
const idsDefined = new Set([...markup.matchAll(/id="([^"]+)"/g)].map(m => m[1]));
const missingIds = [...idsUsed].filter(id => !idsDefined.has(id) && !KNOWN_DYNAMIC.has(id));
if (missingIds.length) fail('getElementById targets not in markup: ' + missingIds.join(', '));
else ok(idsUsed.size + ' referenced IDs all present');

// 3. Every inline on* handler maps to a defined function.
console.log('\nInline handler audit');
const DOM_METHODS = new Set(['if', 'click', 'select', 'getElementById', 'preventDefault', 'focus', 'blur', 'closest']);
const handlers = new Set();
for (const m of markup.matchAll(/on(?:click|input|change|keydown|submit)="([^"]+)"/g)) {
  for (const f of m[1].matchAll(/([a-zA-Z_]\w*)\s*\(/g)) handlers.add(f[1]);
}
const defined = new Set([...script.matchAll(/function\s+(\w+)\s*\(/g)].map(m => m[1]));
const undefinedHandlers = [...handlers].filter(h => !defined.has(h) && !DOM_METHODS.has(h));
if (undefinedHandlers.length) fail('handlers with no function: ' + undefinedHandlers.join(', '));
else ok(handlers.size + ' inline handlers all defined');

// 4. No duplicate function definitions (a classic copy-paste regression).
console.log('\nDuplicate function check');
const counts = {};
for (const m of script.matchAll(/^function\s+(\w+)\s*\(/gm)) counts[m[1]] = (counts[m[1]] || 0) + 1;
const dups = Object.entries(counts).filter(([, c]) => c > 1);
if (dups.length) fail('duplicate functions: ' + dups.map(([k, c]) => `${k}(${c}x)`).join(', '));
else ok('no duplicate function definitions');

// 5. Version strings are in sync between index.html and sw.js.
console.log('\nVersion sync');
const appVer = (script.match(/APP_VERSION\s*=\s*'([^']+)'/) || [])[1];
const sw = fs.readFileSync(path.join(ROOT, 'sw.js'), 'utf8');
const cacheVer = (sw.match(/brewcraft-v([0-9.]+)/) || [])[1];
if (!appVer) fail('APP_VERSION not found in index.html');
else if (!cacheVer) fail('cache version not found in sw.js');
else if (appVer !== cacheVer) fail(`APP_VERSION (${appVer}) != sw.js cache (${cacheVer}) — bump them together`);
else ok(`version ${appVer} consistent across index.html and sw.js`);

// 6. No leftover blocking dialogs (the project removed all confirm/prompt).
console.log('\nBlocking-dialog check');
const confirms = (script.match(/\bconfirm\(/g) || []).length;
const prompts = (script.match(/\bprompt\(/g) || []).length;
if (confirms || prompts) fail(`found ${confirms} confirm() and ${prompts} prompt() — use in-app toasts/modals instead`);
else ok('no confirm()/prompt() blocking dialogs');

// 7. Document closes properly.
console.log('\nStructural integrity');
if (!html.trimEnd().endsWith('</html>')) fail('file does not end with </html> (possible truncation)');
else ok('document ends with </html>');

console.log('\n' + (failures ? `FAILED — ${failures} issue(s)` : 'All checks passed.'));
process.exit(failures ? 1 : 0);
