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
