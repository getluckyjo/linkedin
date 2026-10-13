// Build a LinkedIn PDF carousel (1080x1350 per page) from a simple markdown file.
//
// Usage:  node tools/carousel/build.mjs posts/carousels/<name>.md
// Output: posts/carousels/<name>.pdf and <name>-01.png (first slide preview)
//
// Slide markdown format: slides separated by a line containing only "---".
// Inside a slide:
//   kicker: text          small uppercase label at the top (optional)
//   dark                  on its own line makes the slide dark (optional)
//   # Title               h1 (cover) or h2 (inner slides)
//   big: 32               a giant number
//   plain lines           paragraphs
// A final slide with "kicker: end" gets the sign-off footer.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { chromium } from "playwright";

const src = process.argv[2];
if (!src) { console.error("usage: node tools/carousel/build.mjs <slides.md>"); process.exit(1); }

const here = dirname(new URL(import.meta.url).pathname);
const template = readFileSync(join(here, "template.html"), "utf8");
const raw = readFileSync(src, "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<span class="accent">$1</span>');

const slides = raw.split(/\n---\n/).map((s) => s.trim()).filter(Boolean);
const total = slides.length;
const handle = "Johannes le Roux  ·  Launch, learn, repeat";

const html = slides.map((block, i) => {
  const lines = block.split("\n");
  let kicker = "", dark = false, title = "", big = "";
  const paras = [];
  for (const line of lines) {
    if (/^kicker:/.test(line)) kicker = line.replace(/^kicker:\s*/, "");
    else if (/^dark\s*$/.test(line)) dark = true;
    else if (/^big:/.test(line)) big = line.replace(/^big:\s*/, "");
    else if (/^#\s/.test(line)) title = line.replace(/^#\s*/, "");
    else if (line.trim()) paras.push(line.trim());
  }
  const first = i === 0, last = i === total - 1;
  const h = first ? `<h1>${inline(title)}</h1>` : title ? `<h2>${inline(title)}</h2>` : "";
  const bigHtml = big ? `<div class="big">${esc(big)}</div>` : "";
  const body = paras.map((p) => `<p>${inline(p)}</p>`).join("");
  const footRight = first ? `<span class="swipe">swipe →</span>` : `<span class="n">${i + 1} / ${total}</span>`;
  return `<section class="slide${dark ? " dark" : ""}">
    <div class="kicker">${esc(kicker)}</div>
    <div class="body">${bigHtml}${h}${body}</div>
    <div class="foot"><span>${esc(handle)}</span>${footRight}</div>
  </section>`;
}).join("\n");

const page = template.replace("<!--SLIDES-->", html);
const outBase = resolve(dirname(src), basename(src, ".md"));
mkdirSync(dirname(outBase), { recursive: true });
writeFileSync(outBase + ".html", page);

const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
await p.setContent(page, { waitUntil: "load" });
await p.pdf({ path: outBase + ".pdf", width: "1080px", height: "1350px", printBackground: true, preferCSSPageSize: true });
await p.screenshot({ path: outBase + "-01.png", clip: { x: 0, y: 0, width: 1080, height: 1350 } });
await browser.close();
console.log(`built ${outBase}.pdf (${total} slides) and ${outBase}-01.png`);
