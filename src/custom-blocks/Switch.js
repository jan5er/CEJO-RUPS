import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { valueInput } from "./utils";

export const switchStatement = {
  definition: namedBlock("switch", {
    type: "switch_statement",
    message0: "( %1 ) case %2: %3 case %4: %5 case %6: %7 default: %8",
    args0: [
      valueInput("VALUE"),
      valueInput("CASE"),
      { type: "input_statement", name: "DO" },
      valueInput("CASE_2"),
      { type: "input_statement", name: "DO_2" },
      valueInput("CASE_3"),
      { type: "input_statement", name: "DO_3" },
      { type: "input_statement", name: "DEFAULT" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  }),
  generator: (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", Order.NONE) || '""';
    const caseValue = (name) =>
      generator.valueToCode(block, name, Order.NONE) || '""';
    const caseCode = (name) => generator.statementToCode(block, name);
    const defaultCode = generator.statementToCode(block, "DEFAULT");
    return `switch (${value}) {
  case ${caseValue("CASE")}:
${caseCode("DO")}    break;
  case ${caseValue("CASE_2")}:
${caseCode("DO_2")}    break;
  case ${caseValue("CASE_3")}:
${caseCode("DO_3")}    break;
  default:
${defaultCode}}\n`;
  },
};
