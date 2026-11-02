import { Order } from "blockly/javascript";
import { forBlock } from "./generator";

//JSON for representing simple text element for level 1
export const simpleTextLevel1JSON = {
    "type": "text_simple_level1",
    "tooltip": "Preprosto besedilo",
    "helpUrl": "",
    "message0": "Preprosto besedilo %1",
    "args0": [
        {
            "type": "input_value",
            "name": "TEXT",
            "check": "String"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 225
};

//Generator for simple text element
export const initGenSimpleText = () => {
    forBlock["text_simple_level1"] = (block, generator) => {
        const subStackTopBlock = block.getTopStackBlock();
        const text = generator.valueToCode(block, "TEXT", Order.ATOMIC);

        const simpleTextGenCode = generator.provideFunction_(
            "simpleTextGenCode",
            `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text, containerId) {
                const containerDiv = document.getElementById(containerId);

                const textlEl = document.createElement('p');
                textlEl.innerText = text;
                containerDiv.appendChild(textlEl);
        }`,
        );
        // Generate the function call for this block.
        const code = `${simpleTextGenCode}(${text},${subStackTopBlock.id});\n`;
        return code;
    };
};
