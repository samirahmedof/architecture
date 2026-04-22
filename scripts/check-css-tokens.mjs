#!/usr/bin/env node
/*
 * CSS hygiene check for native CSS + CSS Modules + LightningCSS codebase.
 *
 * Runs multiple rule categories across src/**\/*.css:
 *
 *   1. no-primitive-in-component
 *        Forbid direct use of primitive color tokens (--gray-*, --blue-*, etc.)
 *        outside src/assets/styles/tokens/. Components must consume SEMANTIC
 *        tokens so dark theme + future repaletting work. Token files live
 *        exclusively under src/assets/styles/tokens/.
 *
 *   2. no-raw-hex
 *        Forbid raw hex colors (#fff, #abcdef) in *.module.css files.
 *        Colors must come from tokens.
 *
 *   3. no-raw-font-weight
 *        Forbid `font-weight: 500` numeric literals in *.module.css files.
 *        Use --weight-regular / --weight-medium / --weight-semibold / --weight-bold.
 *
 *   4. no-raw-duration
 *        Forbid bare `200ms` / `1.5s` duration literals in *.module.css files.
 *        Use --duration-* tokens.
 *
 *   5. no-srgb-color-mix, no-rgb-from
 *        Forbid `color-mix(in srgb, ...)` and `rgb(from ...)` in *.module.css.
 *        Standardized on oklch — use color-mix(in oklch, ...) or oklch(from ...).
 *
 *   6. no-top-level-element-selector
 *        Forbid top-level element selectors in *.module.css files.
 *        Modules must scope styles via a class — raw `a { }` or `body { }`
 *        leaks globally and beats the `base` layer silently.
 *
 *   7. no-raw-color-function
 *        Forbid rgb()/rgba()/hsl()/hsla()/hwb()/lab()/lch() literals in
 *        *.module.css files. Standardized on oklch — all colors must come
 *        from semantic tokens. The only allowed color functions inside
 *        modules are oklch(), color-mix(in oklch, ...), and the relative-
 *        color form oklch(from var(--token) l c h / alpha).
 *
 * Usage:
 *   node scripts/check-css-tokens.mjs <file1.css> <file2.css> ...
 *   (no args → scans all *.css under src/)
 */
import { readFile } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
import { argv, exit } from 'node:process';
import { glob } from 'node:fs/promises';

const TOKEN_DIR = `src${sep}assets${sep}styles${sep}tokens${sep}`;
/* Token files live under the global tokens/ dir. */
const isTokenFile = (file) => file.includes(TOKEN_DIR);
const isModuleFile = (file) => file.endsWith('.module.css');

/* Rule 1 — primitive tokens outside tokens/. */
const PRIMITIVE_RE =
  /var\(\s*(--(?:gray|blue|red|green|yellow|orange|purple|pink)-\d{2,3}|--white|--black)\b/g;

/* Rule 2 — raw hex in modules. */
const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;

/* Rule 3 — raw font-weight numeric. */
const FONT_WEIGHT_RE = /\bfont-weight\s*:\s*\d+\b/g;

/* Rule 4 — bare duration literals (ms, s) not inside var() or calc(). */
const DURATION_RE = /\b\d+(?:\.\d+)?m?s\b/g;

/* Rule 5a — color-mix(in srgb,…). */
const SRGB_MIX_RE = /color-mix\(\s*in\s+srgb\b/g;
/* Rule 5b — rgb(from …). */
const RGB_FROM_RE = /\brgb\(\s*from\b/g;

/* Rule 7 — legacy color functions in modules. Any of rgb/rgba/hsl/hsla/hwb/lab/lch. */
const LEGACY_COLOR_FN_RE = /(?<![\w-])(?:rgba?|hsla?|hwb|lab|lch)\s*\(/g;

/* Rule 6 — top-level element selector. Line starts with an HTML tag name
 * immediately followed by comma/brace/whitespace+brace; no leading `&` or `.`.
 * Covers the accidental-global case; not a full CSS parser, so nested forms
 * like `&:hover` or `.x &` pass through. */
const TAG_NAMES =
  'html|body|a|button|input|textarea|select|div|span|p|section|article|aside|header|footer|main|nav|h1|h2|h3|h4|h5|h6|ul|ol|li|img|form|label|table|thead|tbody|tr|td|th';
const TOP_LEVEL_TAG_RE = new RegExp(`^(?:${TAG_NAMES})\\s*[,{]`);

const categoryMessage = {
  'no-primitive-in-component':
    'Primitives (--gray-*, --blue-*, etc.) belong only in src/assets/styles/tokens/. Use a semantic token.',
  'no-raw-hex':
    'Raw hex colors are banned in *.module.css. Reference a semantic token (or add one if missing).',
  'no-raw-font-weight':
    'Raw font-weight numerics are banned. Use --weight-regular / --weight-medium / --weight-semibold / --weight-bold.',
  'no-raw-duration':
    'Raw duration literals are banned. Use --duration-instant / --duration-fast / --duration-base / --duration-slow.',
  'no-srgb-color-mix':
    'color-mix(in srgb, …) is banned. Standardize on oklch: color-mix(in oklch, …).',
  'no-rgb-from':
    'rgb(from …) is banned. Use oklch(from var(--token) l c h / alpha) for opacity variants.',
  'no-top-level-element-selector':
    'Top-level element selectors leak globally from .module.css. Scope through a class (or nest inside one).',
  'no-raw-color-function':
    'Legacy color functions (rgb/rgba/hsl/hsla/hwb/lab/lch) are banned in *.module.css. Use a semantic token, or — for opacity variants — oklch(from var(--token) l c h / alpha).',
};

const collectFiles = async (args) => {
  if (args.length > 0) return args.map((a) => resolve(a));
  const out = [];
  for await (const f of glob('src/**/*.css')) out.push(resolve(f));
  return out;
};

const violations = [];
const files = await collectFiles(argv.slice(2));

const pushViolation = (file, line, col, rule, detail, snippet) => {
  violations.push({ file, line, col, rule, detail, snippet });
};

for (const file of files) {
  let src;
  try {
    src = await readFile(file, 'utf8');
  } catch {
    continue;
  }
  const lines = src.split('\n');
  const inTokens = isTokenFile(file);
  const inModule = isModuleFile(file);
  let inBlockComment = false;

  lines.forEach((line, i) => {
    /* Strip single-line comments; track block comments so we don't flag
     * things inside /* … *\/ . */
    let scanLine = line;
    if (inBlockComment) {
      const end = scanLine.indexOf('*/');
      if (end === -1) return;
      scanLine = scanLine.slice(end + 2);
      inBlockComment = false;
    }
    /* Strip inline block comments. */
    scanLine = scanLine.replace(/\/\*[\s\S]*?\*\//g, '');
    const openIdx = scanLine.indexOf('/*');
    if (openIdx !== -1) {
      scanLine = scanLine.slice(0, openIdx);
      inBlockComment = true;
    }

    /* Rule 1 — primitives outside tokens/ (applies to any non-tokens file). */
    if (!inTokens) {
      for (const m of scanLine.matchAll(PRIMITIVE_RE)) {
        pushViolation(file, i + 1, m.index + 1, 'no-primitive-in-component',
          `var(${m[1]})`, line.trim());
      }
    }

    /* The rest apply only to .module.css files. */
    if (!inModule) return;

    /* Rule 2 — raw hex. */
    for (const m of scanLine.matchAll(HEX_RE)) {
      pushViolation(file, i + 1, m.index + 1, 'no-raw-hex', m[0], line.trim());
    }

    /* Rule 3 — raw font-weight numeric. */
    for (const m of scanLine.matchAll(FONT_WEIGHT_RE)) {
      pushViolation(file, i + 1, m.index + 1, 'no-raw-font-weight', m[0], line.trim());
    }

    /* Rule 4 — raw durations. Skip matches inside var() or calc() because those
     * are likely acceptable unit args; simplest check: reject if line contains
     * a standalone duration token that isn't part of a var(--... expression. */
    for (const m of scanLine.matchAll(DURATION_RE)) {
      /* Ignore integers/decimals that aren't time values — regex already limited
       * to \d+m?s, but e.g. `0.5s` could be valid if part of a var default.
       * Crude filter: skip if the preceding char is `(` (likely calc/var arg). */
      const prev = scanLine[m.index - 1];
      if (prev === '(') continue;
      pushViolation(file, i + 1, m.index + 1, 'no-raw-duration', m[0], line.trim());
    }

    /* Rule 5a — color-mix(in srgb, …). */
    for (const m of scanLine.matchAll(SRGB_MIX_RE)) {
      pushViolation(file, i + 1, m.index + 1, 'no-srgb-color-mix', m[0], line.trim());
    }

    /* Rule 5b — rgb(from …). */
    for (const m of scanLine.matchAll(RGB_FROM_RE)) {
      pushViolation(file, i + 1, m.index + 1, 'no-rgb-from', m[0], line.trim());
    }

    /* Rule 7 — legacy color functions. rgb(from …) is already covered by 5b,
     * so skip any rgb( preceded by `from` keyword. Any other occurrence of
     * rgba/hsl/hsla/hwb/lab/lch/rgb( is a violation. */
    for (const m of scanLine.matchAll(LEGACY_COLOR_FN_RE)) {
      const after = scanLine.slice(m.index + m[0].length).trimStart();
      if (after.startsWith('from')) continue; /* relative color syntax — handled by 5b */
      pushViolation(file, i + 1, m.index + 1, 'no-raw-color-function', m[0].trim(), line.trim());
    }

    /* Rule 6 — top-level element selector. Only match when the trimmed line
     * starts with a tag name (not ` &`, `.`, `#`, `:`, `@`, etc.). */
    const trimmed = scanLine.trimStart();
    if (trimmed === scanLine && TOP_LEVEL_TAG_RE.test(trimmed)) {
      const match = trimmed.match(TOP_LEVEL_TAG_RE);
      pushViolation(file, i + 1, 1, 'no-top-level-element-selector', match[0], line.trim());
    }
  });
}

if (violations.length === 0) {
  exit(0);
}

/* Group by rule for readable output. */
const byRule = new Map();
for (const v of violations) {
  if (!byRule.has(v.rule)) byRule.set(v.rule, []);
  byRule.get(v.rule).push(v);
}

console.error(`\n✖ ${violations.length} CSS hygiene violation(s):\n`);
for (const [rule, list] of byRule) {
  console.error(`── ${rule} (${list.length}) ──────────────────────────────`);
  console.error(`   ${categoryMessage[rule]}\n`);
  for (const v of list) {
    console.error(`   ${v.file}:${v.line}:${v.col}`);
    console.error(`     → ${v.detail}`);
    console.error(`     ${v.snippet}\n`);
  }
}
exit(1);
