// Build a LinkedIn PDF carousel (1080x1350 per page) in Entrepreneur Coach branding
// from a simple slide file.
//
// Usage:  node tools/carousel/build.mjs posts/carousels/<name>.md
// Output: <name>.pdf (upload this as a LinkedIn document post) and <name>-01.png (slide one preview)
//
// Slide file format: slides separated by a line containing only "---".
// Inside a slide:
//   kicker: text          small uppercase eyebrow at the top (optional)
//   kicker!: text         same, in brand red
//   dark                  black slide (use for the cover and the close)
//   bone                  off-white slide
//   # Title               h1 on the cover, h2 on inner slides
//   big: R50              a giant number; "big!: R50" makes it red
//   watermark             faded "le Roux" signature behind the slide (good on the last one)
//   plain lines           paragraphs
// Inline: *word* renders red italic (the site's display-italic display-red), **word** renders red.

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "playwright";

const src = process.argv[2];
if (!src) { console.error("usage: node tools/carousel/build.mjs <slides.md>"); process.exit(1); }

const here = dirname(new URL(import.meta.url).pathname);
const fontsUrl = pathToFileURL(join(here, "fonts") + "/").href;
const template = readFileSync(join(here, "template.html"), "utf8").replaceAll("{{FONTS}}", fontsUrl);
const raw = readFileSync(src, "utf8");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const inline = (s) => esc(s)
  .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
  .replace(/\*(.+?)\*/g, "<em>$1</em>");

const slides = raw.split(/\n---\n/).map((s) => s.trim()).filter(Boolean);
const total = slides.length;

const html = slides.map((block, i) => {
  let kicker = "", kickerRed = false, cls = "", title = "", big = "", bigRed = false, watermark = false;
  const paras = [];
  for (const line of block.split("\n")) {
    if (/^kicker!:/.test(line)) { kicker = line.replace(/^kicker!:\s*/, ""); kickerRed = true; }
    else if (/^kicker:/.test(line)) kicker = line.replace(/^kicker:\s*/, "");
    else if (/^dark\s*$/.test(line)) cls = " dark";
    else if (/^bone\s*$/.test(line)) cls = " bone";
    else if (/^watermark\s*$/.test(line)) watermark = true;
    else if (/^big!:/.test(line)) { big = line.replace(/^big!:\s*/, ""); bigRed = true; }
    else if (/^big:/.test(line)) big = line.replace(/^big:\s*/, "");
    else if (/^#\s/.test(line)) title = line.replace(/^#\s*/, "");
    else if (line.trim()) paras.push(line.trim());
  }
  const first = i === 0;
  const h = first ? `<h1>${inline(title)}</h1>` : title ? `<h2>${inline(title)}</h2>` : "";
  const bigHtml = big ? `<div class="big${bigRed ? " red" : ""}">${esc(big)}</div>` : "";
  const body = paras.map((p) => `<p>${inline(p)}</p>`).join("");
  const meta = first ? `<span class="swipe">Swipe →</span>` : `${i + 1} / ${total}`;
  return `<section class="slide${cls}">
    ${watermark ? `<div class="watermark">le Roux</div>` : ""}
    <div class="eyebrow${kickerRed ? " red" : ""}">${esc(kicker)}</div>
    <div class="body">${bigHtml}${h}${body}</div>
    <div class="foot">
      <span class="brand"><span class="name">Johannes le Roux</span><span class="dot"></span></span>
      <span class="meta">${meta}</span>
    </div>
  </section>`;
}).join("\n");

const page = template.replace("<!--SLIDES-->", html);
const outBase = resolve(dirname(src), basename(src, ".md"));
mkdirSync(dirname(outBase), { recursive: true });
writeFileSync(outBase + ".html", page);

const browser = await chromium.launch();
const p = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
await p.goto(pathToFileURL(outBase + ".html").href, { waitUntil: "load" });
await p.evaluate(() => document.fonts.ready);
await p.pdf({ path: outBase + ".pdf", width: "1080px", height: "1350px", printBackground: true, preferCSSPageSize: true });
await p.screenshot({ path: outBase + "-01.png", clip: { x: 0, y: 0, width: 1080, height: 1350 } });
await browser.close();
console.log(`built ${outBase}.pdf (${total} slides) and ${outBase}-01.png`);
