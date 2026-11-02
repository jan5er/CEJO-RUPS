import * as Blockly from "blockly/core";
import { Order } from "blockly/javascript";

export const forBlock = Object.create(null);

forBlock.text_print = (block, generator) => {
    const msg = generator.valueToCode(block, "TEXT", Order.NONE) || "''";

    return `console.log(${msg});\n`;
};

forBlock.ask_user = (block, generator) => {
    const question =
        generator.valueToCode(block, "QUESTION", Order.NONE) || '""';

    const variableBlock = block.getInputTargetBlock("VARIABLE");

    if (!variableBlock) {
        return "";
    }

    const variable = generator.getVariableName(
        variableBlock.getFieldValue("VAR")
    );

    return `${variable} = prompt(${question});\n`;
};

