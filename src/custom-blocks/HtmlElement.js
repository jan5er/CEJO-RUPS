import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { parentElement, valueInput } from "./utils";

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
    const id = block.getFieldValue("ID").trim();
    const text = generator.valueToCode(block, "TEXT", Order.ATOMIC) || '""';
    const content = tag === "input" ? "placeholder" : "textContent";
    const setId = id ? `  element.id = ${JSON.stringify(id)};\n` : "";
    return `{\n  const element = document.createElement(${JSON.stringify(tag)});\n${setId}  element.${content} = ${text};\n  const parent = ${parentElement(block)};\n  if (parent) parent.appendChild(element);\n}\n`;
  },
};
