#!/usr/bin/env node
// Screenshot di verifica con Playwright (solo sviluppo).
//
//   node scripts/screenshots.mjs [--base http://localhost:3300] [--out work/screens]
//        [--pages /,/privacy] [--sizes 390x844,1440x900] [--browser chromium|webkit]
//        [--viewport]          solo la prima schermata
//        [--at 0.5]            con --viewport: scrolla a una frazione della pagina
//        [--el #menu]          con --viewport: scrolla fino all'elemento (top)
//        [--hero 0.3,0.6,1]    stati dell'uscita della hero (avanzamento dello scrub)
//        [--intro 0.4,0.9]     fotogrammi dell'intro (secondi dall'avvio)
//        [--reduced]           prefers-reduced-motion: reduce
//        [--nojs]              JavaScript disattivato
//        [--scan]              una schermata ogni 0.9 viewport fino in fondo (niente fullPage:
//                              le unità svh nei fullPage di Chromium esplodono)
//        [--tag nome]          suffisso del file
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, webkit } from "playwright";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
};
const flag = (name) => args.includes(`--${name}`);

const base = opt("base", "http://localhost:3300");
const out = opt("out", "work/screens");
const browserName = opt("browser", "chromium");
const pages = opt("pages", "/").split(",");
const sizes = opt("sizes", "390x844,1440x900").split(",").map((s) => s.split("x").map(Number));
const viewportOnly = flag("viewport");
const reduced = flag("reduced");
const noJs = flag("nojs");
const at = opt("at", null);
const el = opt("el", null);
const hero = opt("hero", null);
const intro = opt("intro", null);
const tag = opt("tag", "");
const scan = flag("scan");

const slug = (p) => (p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "-"));
const browser = await (browserName === "webkit" ? webkit : chromium).launch();
await mkdir(out, { recursive: true });

const name = (p, w, h, extra) =>
  path.join(out, [slug(p), `${w}x${h}`, browserName !== "chromium" && browserName, reduced && "reduced", noJs && "nojs", extra, tag].filter(Boolean).join("-") + ".png");

for (const [width, height] of sizes) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    isMobile: width < 768 && browserName === "chromium",
    hasTouch: width < 768,
    reducedMotion: reduced ? "reduce" : "no-preference",
    javaScriptEnabled: !noJs,
  });
  const page = await context.newPage();
  page.on("pageerror", (e) => console.log("  [pageerror]", e.message));
  page.on("console", (m) => m.type() === "error" && console.log("  [console]", m.text()));
  for (const p of pages) {
    if (intro) {
      // intro: nuova sessione, fotogrammi a tempi fissi
      for (const t of intro.split(",").map(Number)) {
        const ctx2 = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 768 });
        const pg = await ctx2.newPage();
        await pg.goto(base + p, { waitUntil: "domcontentloaded" });
        await pg.waitForFunction(() => document.getElementById("tovaglia")?.dataset.state === "running", null, { timeout: 8000 }).catch(() => {});
        await pg.waitForTimeout(t * 1000);
        const file = name(p, width, height, `intro${t}`);
        await pg.screenshot({ path: file });
        console.log(`  ${file}`);
        await ctx2.close();
      }
      continue;
    }
    await page.goto(base + p, { waitUntil: "networkidle" });
    if (!noJs) {
      // niente intro negli scatti normali
      await page.evaluate(() => sessionStorage.setItem("ob-intro", "1"));
      await page.reload({ waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
    }
    if (hero) {
      for (const f of hero.split(",").map(Number)) {
        await page.evaluate((f) => {
          const h = document.getElementById("hero");
          window.scrollTo(0, (h.offsetHeight - innerHeight) * f);
        }, f);
        await page.waitForTimeout(1600);
        const file = name(p, width, height, `hero${f}`);
        await page.screenshot({ path: file });
        console.log(`  ${file}`);
      }
      continue;
    }
    if (scan) {
      const total = await page.evaluate(() => document.documentElement.scrollHeight);
      let k = 0;
      for (let y = 0; y < total; y += Math.round(height * 0.9)) {
        await page.evaluate((y) => window.scrollTo(0, y), y);
        await page.waitForTimeout(noJs ? 300 : 1300);
        const file = name(p, width, height, `scan${String(k++).padStart(2, "0")}`);
        await page.screenshot({ path: file });
      }
      console.log(`  ${k} schermate ${slug(p)} ${width}x${height}`);
      continue;
    }
    if (noJs) {
      await page.waitForTimeout(800);
    } else if (!viewportOnly) {
      // attraversa la pagina per far scattare reveal e lazy-load, poi torna in cima
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.5) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(1500);
    } else if (el) {
      await page.evaluate((sel) => {
        const t = document.querySelector(sel);
        window.scrollTo(0, t.getBoundingClientRect().top + scrollY);
      }, el);
      await page.waitForTimeout(1800);
    } else if (at) {
      await page.evaluate((f) => window.scrollTo(0, (document.body.scrollHeight - innerHeight) * Number(f)), at);
      await page.waitForTimeout(1800);
    } else {
      await page.waitForTimeout(600);
    }
    const extra = el ? el.replace(/[^a-z0-9]+/gi, "") : at ? `at${at}` : "";
    const file = name(p, width, height, extra);
    await page.screenshot({ path: file, fullPage: !viewportOnly });
    console.log(`  ${file}`);
  }
  await context.close();
}
await browser.close();
