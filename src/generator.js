import { Order, javascriptGenerator } from "blockly/javascript";

javascriptGenerator.forBlock.text_print = (block, generator) => {
    const msg = generator.valueToCode(block, "TEXT", Order.NONE) || "''";
    return `console.log(${msg});\n`;
};