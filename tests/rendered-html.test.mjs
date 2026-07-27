import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("keeps the landing's critical conversion paths", async () => {
  const page = await source("app/page.tsx");

  assert.match(page, /https:\/\/formspree\.io\/f\/mzdnyqrl/);
  assert.match(page, /href="\/privacidad"/);
  assert.match(page, /href="\/terminos"/);
  assert.match(page, /mailto:veobaby\.hiperrealismo@gmail\.com/);
  assert.doesNotMatch(page, /Starter Project|Your site is taking shape|codex-preview/i);
});

test("keeps the privacy and service commitments", async () => {
  const [privacy, terms] = await Promise.all([
    source("app/privacidad/page.tsx"),
    source("app/terminos/page.tsx"),
  ]);

  assert.match(privacy, /treinta \(30\)\s+d[ií]as/i);
  assert.match(privacy, /veobaby\.hiperrealismo@gmail\.com/i);
  assert.match(terms, /recreativ/i);
  assert.match(terms, /href="\/privacidad"|<Link href="\/privacidad"/);
});

test("publishes crawl directives and all public URLs", async () => {
  const [robots, sitemap] = await Promise.all([
    source("app/robots.ts"),
    source("app/sitemap.ts"),
  ]);

  assert.match(robots, /userAgent:\s*"\*"/);
  assert.match(robots, /sitemap:/);
  assert.match(sitemap, /\/privacidad/);
  assert.match(sitemap, /\/terminos/);
});
