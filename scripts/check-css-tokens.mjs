#!/usr/bin/env node
/*
 * Forbids direct use of primitive color tokens (--gray-*, --blue-*, --red-*,
 * --green-*, --white, --black) outside src/assets/styles/tokens/.
 *
 * Components must consume the SEMANTIC layer (--text-main, --bg-surface,
 * --brand-primary, etc.) so dark theme + future re-paletting work.
 *
 * Usage:
 *   node scripts/check-css-tokens.mjs <file1.css> <file2.css> ...
 *   (no args → scans all *.css under src/, excluding tokens/)
 */
import { readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { argv, exit } from 'node:process';
import { glob } from 'node:fs/promises';

const TOKEN_DIR = `src${sep}assets${sep}styles${sep}tokens${sep}`;
const FORBIDDEN = /var\(\s*(--(?:gray|blue|red|green|yellow|orange|purple|pink)-\d{2,3}|--white|--black)\b/g;

const isTokenFile = (file) => file.includes(TOKEN_DIR);

const collectFiles = async (args) => {
  if (args.length > 0) return args.map((a) => resolve(a));
  const out = [];
  for await (const f of glob('src/**/*.css')) out.push(resolve(f));
  return out;
};

const violations = [];
const files = await collectFiles(argv.slice(2));

for (const file of files) {
  if (isTokenFile(file)) continue;
  let src;
  try {
    src = await readFile(file, 'utf8');
  } catch {
    continue;
  }
  const lines = src.split('\n');
  lines.forEach((line, i) => {
    for (const m of line.matchAll(FORBIDDEN)) {
      violations.push({ file, line: i + 1, col: m.index + 1, token: m[1], snippet: line.trim() });
    }
  });
}

if (violations.length === 0) {
  exit(0);
}

console.error(`\n✖ ${violations.length} primitive color token usage(s) outside tokens/:\n`);
for (const v of violations) {
  console.error(`  ${v.file}:${v.line}:${v.col}`);
  console.error(`    var(${v.token})  →  use a semantic token instead`);
  console.error(`    ${v.snippet}\n`);
}
console.error('Primitives (--gray-*, --blue-*, --red-*, etc.) belong only in src/assets/styles/tokens/.');
console.error('Add or reuse a semantic token (--text-*, --bg-*, --brand-*, --border-*, --form-control-*).');
exit(1);
