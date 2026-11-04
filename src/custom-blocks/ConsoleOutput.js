import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { valueInput } from "./utils";

export const consoleOutput = {
  definition: namedBlock("izpiši v konzolo", {
    type: "console_output",
    message0: "%1",
    args0: [valueInput("VALUE")],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
  }),
  generator: (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", Order.ATOMIC) || '""';
    return `console.log(${value});\n`;
  },
};
