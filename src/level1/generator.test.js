// @vitest-environment jsdom
import "./utils/generator";
import "blockly/blocks";
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import { expect, test } from "vitest";
import { run } from "../interpreter";

// jsdom doesn't implement innerText
Object.defineProperty(HTMLElement.prototype, "innerText", {
  get() {
    return this.textContent;
  },
  set(value) {
    this.textContent = value;
  },
});

const text = (value) => ({
  block: { type: "text", fields: { TEXT: value } },
});

const stack = (...blocks) =>
  blocks.reduceRight(
    (next, block) => (next ? { ...block, next: { block: next } } : block),
    null,
  );

const heading = (value) => ({
  type: "heading_level1",
  inputs: { TEXT: text(value) },
});
const paragraph = (value) => ({
  type: "text_simple_level1",
  inputs: { TEXT: text(value) },
});

const container = (...children) => ({
  type: "container_level1",
  inputs: { SUB_ELEMENTS: { block: stack(...children) } },
});

const page = (...children) => ({
  type: "page_level1",
  x: 0,
  y: 0,
  inputs: { CONTENT: { block: stack(...children) } },
});

function render(blocks) {
  const ws = new Blockly.Workspace();
  Blockly.serialization.workspaces.load(
    { blocks: { languageVersion: 0, blocks } },
    ws,
  );
  const code = javascriptGenerator.workspaceToCode(ws);
  ws.dispose();

  document.body.innerHTML = `<div id="output"></div>`;
  expect(run(code).error).toBeNull();
  return document.getElementById("output");
}

test("vsak vsebnik izriše svoje otroke", () => {
  const output = render([
    page(container(heading("1")), container(paragraph("2"))),
  ]);

  const divs = output.querySelectorAll(":scope > div");
  expect(divs).toHaveLength(2);
  expect(divs[0].innerHTML).toBe("<h1>1</h1>");
  expect(divs[1].innerHTML).toBe("<p>2</p>");
});

test("vrstni red določa zlaganje v Stran, ne položaj na platnu", () => {
  const output = render([page(paragraph("spodaj"), heading("zgoraj"))]);
  expect(output.innerHTML).toBe("<p>spodaj</p><h1>zgoraj</h1>");
});

test("vsebniki se lahko gnezdijo", () => {
  const output = render([
    page(
      container(heading("a"), container(paragraph("b")), paragraph("c")),
      heading("d"),
    ),
  ]);

  const strip = (html) => html.replace(/ style="[^"]*"/g, "");
  expect(strip(output.innerHTML)).toBe(
    "<div><h1>a</h1><div><p>b</p></div><p>c</p></div><h1>d</h1>",
  );
});
