import "blockly/blocks";
import "./index";
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import { expect, test } from "vitest";
import { toolboxLevel6 } from "../level6/toolbox";

// Level 6 vsebuje bloke vseh prejšnjih levelov
const toolboxTypes = toolboxLevel6.contents.flatMap((category) =>
  (category.contents ?? []).map((item) => item.type),
);

test.each(toolboxTypes)("blok %s je definiran in ima generator", (type) => {
  expect(Blockly.Blocks[type]).toBeDefined();
  expect(javascriptGenerator.forBlock[type]).toBeDefined();
});

test("toolbox ne podvaja blokov v isti kategoriji", () => {
  for (const category of toolboxLevel6.contents) {
    const types = (category.contents ?? []).map((item) => item.type);
    expect(new Set(types).size).toBe(types.length);
  }
});
