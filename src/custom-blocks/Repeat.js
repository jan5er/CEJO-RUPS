import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { valueInput } from "./utils";

export const repeatLoop = {
  definition: namedBlock("ponovi", {
    type: "repeat_loop",
    message0: "%1 krat %2",
    args0: [
      valueInput("TIMES", "Number"),
      { type: "input_statement", name: "DO" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 290,
  }),
  generator: (block, generator) => {
    const times = generator.valueToCode(block, "TIMES", Order.NONE) || "0";
    return `{ for (let index = 0; index < ${times}; index++) {\n${generator.statementToCode(block, "DO")}} }\n`;
  },
};
