import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { valueInput } from "./utils";

export const cssStyle = {
  definition: namedBlock("CSS", {
    type: "css_style",
    message0: "za %1 velikost %2 barva %3 teža %4 margin %5 padding %6",
    args0: [
      { type: "field_input", name: "ID", text: "element" },
      valueInput("FONT_SIZE", "Number"),
      valueInput("COLOR", "String"),
      valueInput("FONT_WEIGHT", "Number"),
      valueInput("MARGIN", "Number"),
      valueInput("PADDING", "Number"),
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
  }),
  generator: (block, generator) => {
    const numberValue = (name) =>
      generator.valueToCode(block, name, Order.ATOMIC) || "0";
    const color =
      generator.valueToCode(block, "COLOR", Order.ATOMIC) || '"#000000"';
    const id = block.getFieldValue("ID") || "element";
    return `{ const element = document.getElementById("${id}"); if (element) { element.style.fontSize = ${numberValue("FONT_SIZE")} + "px"; element.style.color = ${color}; element.style.fontWeight = Math.min(900, Math.max(100, ${numberValue("FONT_WEIGHT")} * 100)); element.style.margin = ${numberValue("MARGIN")} + "px"; element.style.padding = ${numberValue("PADDING")} + "px"; } }\n`;
  },
};
