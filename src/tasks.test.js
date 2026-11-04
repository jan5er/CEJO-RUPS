// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { passesChecks } from "./checks";
import { tasksLevel1 } from "./level1/tasks";
import { tasksLevel2 } from "./level2/tasks";
import { tasksLevel3 } from "./level3/tasks";
import { tasksLevel4 } from "./level4/tasks";
import { tasksLevel5 } from "./level5/tasks";
import { tasksLevel6 } from "./level6/tasks";

const levels = [
  tasksLevel1,
  tasksLevel2,
  tasksLevel3,
  tasksLevel4,
  tasksLevel5,
  tasksLevel6,
];
const migrated = levels.flat().filter((task) => task.checks);

describe("naloge s checks", () => {
  // Pričakovan izpis, ki ga vidi uporabnik, mora prestati lastna preverjanja,
  // sicer naloge ni mogoče rešiti tako, kot jo prikazujemo.
  test.each(migrated.map((task) => [task.id, task]))(
    "%s: pričakovan izpis prestane preverjanja",
    (_, task) => {
      document.body.innerHTML = `<div id="output">${task.expectedHtml}</div>`;
      expect(passesChecks(document.getElementById("output"), task.checks)).toBe(
        true,
      );
    },
  );

  test.each(migrated.map((task) => [task.id, task]))(
    "%s: prazen izpis ne prestane preverjanj",
    (_, task) => {
      document.body.innerHTML = `<div id="output"></div>`;
      expect(passesChecks(document.getElementById("output"), task.checks)).toBe(
        false,
      );
    },
  );
});

test("id-ji nalog so enolični (ključi za shranjeno platno in kovance)", () => {
  const ids = levels.flat().map((task) => task.id);
  expect(new Set(ids).size).toBe(ids.length);
});
