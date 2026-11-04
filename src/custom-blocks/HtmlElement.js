import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { valueInput } from "./utils";

export const htmlElement = {
  definition: namedBlock("HTML", {
    type: "html_element",
    message0: "%1 id %2 vsebina %3",
    args0: [
      {
        type: "field_dropdown",
        name: "TAG",
        options: [
          ["h1", "h1"],
          ["h2", "h2"],
          ["p", "p"],
          ["small", "small"],
          ["i", "i"],
          ["input", "input"],
        ],
      },
      { type: "field_input", name: "ID", text: "element" },
      valueInput("TEXT"),
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  }),
  generator: (block, generator) => {
    const tag = block.getFieldValue("TAG") || "p";
    const id = block.getFieldValue("ID") || "element";
    const text = generator.valueToCode(block, "TEXT", Order.ATOMIC) || '""';
    return `{ const name = "NamedElement" + Math.floor(Math.random() * 100000); const element = document.createElement("${tag}"); element.id = "${id}"; element.name = name; element.${tag === "input" ? "placeholder" : "textContent"} = ${text}; const output = document.getElementById("output"); if (output) output.appendChild(element); }\n`;
  },
};
