// @vitest-environment jsdom
import { expect, test } from "vitest";
import { formatHtmlString } from "./formatHtml";

test("gnezdeni elementi so zamaknjeni, besedilo ostane v isti vrstici", () => {
  expect(
    formatHtmlString(
      '<div style="margin: 0"><h1> 1-naslov </h1><p>1-opis</p></div>',
    ),
  ).toBe(
    [
      '<div style="margin: 0">',
      "  <h1>1-naslov</h1>",
      "  <p>1-opis</p>",
      "</div>",
    ].join("\n"),
  );
});

test("prazni in void elementi", () => {
  expect(formatHtmlString('<label>a</label><input type="text"><p></p>')).toBe(
    ["<label>a</label>", '<input type="text">', "<p></p>"].join("\n"),
  );
});

test("presledki med elementi ne ustvarijo praznih vrstic", () => {
  expect(formatHtmlString("\n  <h1>a</h1>\n  <h2>b</h2>\n")).toBe(
    "<h1>a</h1>\n<h2>b</h2>",
  );
});

test("posebni znaki so ubežani", () => {
  expect(formatHtmlString('<p title="a &quot;b&quot;">1 &lt; 2</p>')).toBe(
    '<p title="a &quot;b&quot;">1 &lt; 2</p>',
  );
});
