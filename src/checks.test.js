// @vitest-environment jsdom
import { describe, expect, test } from "vitest";
import { passesChecks } from "./checks";

const output = (html) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `<div id="output">${html}</div>`;
  document.body.replaceChildren(wrapper);
  return wrapper.firstElementChild;
};

describe("exists", () => {
  test("ujame poljubno gnezdenje", () => {
    const root = output("<div><div><h1>foo</h1></div></div>");
    expect(passesChecks(root, [{ type: "exists", selector: "div h1" }])).toBe(
      true,
    );
  });

  test("ovojni div aplikacije ne šteje", () => {
    const root = output("<h1>foo</h1>");
    expect(passesChecks(root, [{ type: "exists", selector: "div h1" }])).toBe(
      false,
    );
  });

  test("manjkajoč element", () => {
    const root = output("<p>foo</p>");
    expect(passesChecks(root, [{ type: "exists", selector: "h1" }])).toBe(
      false,
    );
  });
});

describe("text", () => {
  const root = () => output("<h1>  foo bar  </h1><p></p>");
  const text = (selector, match, value) =>
    passesChecks(root(), [{ type: "text", selector, match, value }]);

  test("exact obreže presledke", () => {
    expect(text("h1", "exact", "foo bar")).toBe(true);
    expect(text("h1", "exact", " foo bar ")).toBe(true);
    expect(text("h1", "exact", "foo")).toBe(false);
  });

  test("contains", () => {
    expect(text("h1", "contains", "bar")).toBe(true);
    expect(text("h1", "contains", "baz")).toBe(false);
  });

  test("regex kot niz ali RegExp", () => {
    expect(text("h1", "regex", "^foo")).toBe(true);
    expect(text("h1", "regex", /^FOO/i)).toBe(true);
    expect(text("h1", "regex", "^bar")).toBe(false);
  });

  test("empty in not-empty", () => {
    expect(text("p", "empty")).toBe(true);
    expect(text("h1", "empty")).toBe(false);
    expect(text("h1", "not-empty")).toBe(true);
    expect(text("p", "not-empty")).toBe(false);
  });

  test("brez ujemajočega elementa ne uspe", () => {
    expect(text("h2", "empty")).toBe(false);
  });

  test("dovolj je eden izmed več elementov", () => {
    const r = output("<p>a</p><p>b</p>");
    expect(
      passesChecks(r, [
        { type: "text", selector: "p", match: "exact", value: "b" },
      ]),
    ).toBe(true);
  });
});

test("vsa preverjanja morajo uspeti", () => {
  const root = output("<div><h1>1-naslov</h1></div>");
  expect(
    passesChecks(root, [
      { type: "exists", selector: "div h1" },
      { type: "text", selector: "div h1", match: "exact", value: "1-naslov" },
      { type: "exists", selector: "div p" },
    ]),
  ).toBe(false);
});
