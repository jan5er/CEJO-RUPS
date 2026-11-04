import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { valueInput } from "./utils";

export const ifStatement = {
  definition: namedBlock("če", {
    type: "if_statement",
    message0: "%1 potem %2",
    args0: [
      valueInput("CONDITION", "Boolean"),
      { type: "input_statement", name: "DO" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  }),
  generator: (block, generator) => {
    const condition =
      generator.valueToCode(block, "CONDITION", Order.NONE) || "false";
    return `if (${condition}) {\n${generator.statementToCode(block, "DO")}}\n`;
  },
};
