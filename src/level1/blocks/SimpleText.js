import { forBlock } from "./generator";
import { Order } from "blockly/javascript";

//JSON for representing simple text element for level 1
export const simpleTextLevel1JSON = {
    "type": "text_simple_level1",
    "tooltip": "Simple Text",
    "helpUrl": "",
    "message0": "Simple Text %1",
    "args0": [
        {
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }
    ],
    "colour": 225
};

//Generator for simple text element
export const initGenSimpleText = () => {
    forBlock["input_level1"] = (block, generator) => {
        const text = generator.valueToCode(block, "TEXT", Order.ATOMIC);

        const inputGenCode = generator.provideFunction_(
            "inputGenCode",
            `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text) {
                const outputDiv = document.getElementById('output');

                const textlEl = document.createElement('p');
                textlEl.innerText = text;
                outputDiv.appendChild(textlEl);
        }`,
        );
        // Generate the function call for this block.
        const code = `${inputGenCode}(${text});\n`;
        return code;
    };
};
