import { readFileSync } from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
import { parse } from "yaml";

const css = readFileSync(new URL("../theme.css", import.meta.url), "utf8");
const dataTheme = JSON.parse(
  readFileSync(new URL("../data-theme.json", import.meta.url), "utf8")
);

const settingsSource = css.match(/\/\* @settings\s*([\s\S]*?)\s*\*\//)?.[1];

test("embedded Style Settings block is valid YAML", () => {
  assert.ok(settingsSource, "theme.css must contain an @settings block");
  const settings = parse(settingsSource);
  assert.equal(settings.name, "Kami Reader");
  assert.equal(settings.id, "kami-reader");
  assert.ok(Array.isArray(settings.settings));
  assert.equal(settings.settings.length > 0, true);
});

test("embedded and standalone schemas expose the same setting ids", () => {
  const embedded = parse(settingsSource);
  const embeddedIds = embedded.settings
    .filter((setting) => setting.type !== "heading")
    .map((setting) => setting.id)
    .sort();
  const standaloneIds = dataTheme.sections
    .flatMap((section) => section.settings)
    .map((setting) => setting.id)
    .sort();

  assert.deepEqual(embeddedIds, standaloneIds);
});

test("body and heading typography stay separate without adding a setting", () => {
  assert.match(css, /--font-text-theme:\s*"Charter", "Georgia",[\s\S]*?"Source Han Sans SC", "Noto Sans CJK SC",[\s\S]*?"Microsoft YaHei", sans-serif;/);
  assert.match(css, /--font-heading-theme:\s*"Charter", "Georgia",[\s\S]*?"LXGW WenKai Screen", "LXGW WenKai",[\s\S]*?"Source Han Serif SC"/);
  assert.match(css, /h1, h2, h3, h4, h5, h6,[\s\S]*?font-family:\s*var\(--font-heading-theme\);/);
  assert.match(css, /\.markdown-source-view \.inline-title,[\s\S]*?font-family:\s*var\(--font-heading-theme\);/);
  assert.match(css, /\.markdown-preview-view table\s*\{[\s\S]*?font-family:\s*var\(--font-text-theme\);/);

  const ids = dataTheme.sections.flatMap((section) => section.settings).map((setting) => setting.id);
  assert.ok(ids.includes("font-text-theme"));
  assert.ok(!ids.includes("font-heading-theme"));
});

test("workspace chrome uses the shell plane and semantic icon color", () => {
  assert.match(css, /--tab-container-background:\s*var\(--background-primary-alt\);/);
  assert.match(css, /--ribbon-background:\s*var\(--background-primary-alt\);/);
  assert.match(css, /--status-bar-background:\s*var\(--background-primary-alt\);/);
  assert.match(css, /\.workspace-split\.mod-left-split,[\s\S]*?background-color:\s*var\(--background-primary-alt\);/);
  assert.match(css, /\.nav-file-title\.is-active,[\s\S]*?background-color:\s*transparent;[\s\S]*?inset 2px 0 0 var\(--interactive-accent\)/);
  assert.doesNotMatch(css, /\.workspace-ribbon \.clickable-icon\s*\{[^}]*opacity:\s*0\./s);
  assert.doesNotMatch(css, /\.nav-header \.clickable-icon\s*\{[^}]*opacity:\s*0\./s);
});

test("print export forces white paper while retaining warm document surfaces", () => {
  const printStart = css.indexOf("@media print");
  const printEnd = css.indexOf("@media (prefers-reduced-motion", printStart);
  const print = css.slice(printStart, printEnd);
  assert.ok(printStart >= 0 && printEnd > printStart, "theme.css must define a print stylesheet");
  assert.match(print, /@page\s*\{\s*background:\s*#ffffff;/);
  assert.match(print, /--background-primary:\s*#ffffff;/);
  assert.match(print, /--text-normal:\s*#141413;/);
  assert.match(print, /--text-accent:\s*#1b365d;/);
  assert.match(print, /\.callout,[\s\S]*?background-color:\s*#f5f4ed;/);
  assert.match(print, /tbody tr:nth-child\(even\)[\s\S]*?background-color:\s*#f5f4ed;/);
  assert.match(print, /print-color-adjust:\s*exact;/);
  assert.doesNotMatch(print, /@page\s*\{[^}]*(?:size|margin)\s*:/s);
});

test("README ships the reviewed 1440px PDF export evidence", () => {
  const preview = readFileSync(
    new URL("../screenshots/pdf-export-white.png", import.meta.url)
  );
  const readme = readFileSync(new URL("../README.md", import.meta.url), "utf8");
  const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];

  assert.deepEqual([...preview.subarray(0, 8)], pngSignature);
  assert.equal(preview.readUInt32BE(16), 1440);
  assert.ok(preview.readUInt32BE(20) > 2000, "evidence must retain both rendered PDF pages");
  assert.match(readme, /screenshots\/pdf-export-white\.png/);
});
