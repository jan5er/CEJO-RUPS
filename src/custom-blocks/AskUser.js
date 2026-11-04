import { Order } from "blockly/javascript";

export const askUser = {
  definition: {
    type: "ask_user",
    message0: "vprašaj uporabnika %1 shrani odgovor v %2",
    args0: [
      {
        type: "input_value",
        name: "QUESTION",
        check: "String",
      },
      {
        type: "input_value",
        name: "VARIABLE",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 280,
    tooltip: "Uporabniku postavi vprašanje in shrani odgovor v spremenljivko.",
  },
  generator: (block, generator) => {
    const question =
      generator.valueToCode(block, "QUESTION", Order.NONE) || '""';

    const variableBlock = block.getInputTargetBlock("VARIABLE");

    if (!variableBlock) {
      return "";
    }

    const variable = generator.getVariableName(
      variableBlock.getFieldValue("VAR"),
    );

    return `${variable} = prompt(${question});\n`;
  },
};
