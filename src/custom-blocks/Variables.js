import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { valueInput } from "./utils";

export const variableSet = {
  definition: namedBlock("nastavi spremenljivko", {
    type: "variable_set",
    message0: "%1 na %2",
    args0: [
      { type: "field_input", name: "NAME", text: "vrednost" },
      valueInput("VALUE"),
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  }),
  generator: (block, generator) => {
    const name = block.getFieldValue("NAME") || "vrednost";
    const value = generator.valueToCode(block, "VALUE", Order.ATOMIC) || '""';
    return `globalThis.__programVariables = globalThis.__programVariables || {}; globalThis.__programVariables["${name}"] = ${value};\n`;
  },
};

export const variableGet = {
  definition: namedBlock("vrednost spremenljivke", {
    type: "variable_get",
    message0: "%1",
    args0: [{ type: "field_input", name: "NAME", text: "vrednost" }],
    output: null,
    colour: 330,
  }),
  generator: (block) => [
    `globalThis.__programVariables?.["${block.getFieldValue("NAME") || "vrednost"}"] ?? ""`,
    Order.ATOMIC,
  ],
};
