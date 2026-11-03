import { Order } from 'blockly/javascript';
import { forBlockLevel1 } from "../utils/generator";

//JSON for representing button element for level 1
export const buttonLevel1JSON = {
  "type": "button_level1",
  "tooltip": "",
  "helpUrl": "",
  "message0": "Gumb | Ime: %1",
  "args0": [
    {
      "type": "input_value",
      "name": "TEXT",
      "check": "String"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#da7d12"
};

//Generator for button element
export const initGenButton = () => {

  forBlockLevel1['button_level1'] = (block, generator) => {
    const rootBlock = block.getRootBlock();
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
    const buttonGenCode = generator.provideFunction_(
      'buttonGenCode',
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text, containerId) {
            const containerDiv = document.getElementById(containerId);
            const buttonEl = document.createElement('button');
            buttonEl.innerText = text;
            containerDiv.appendChild(buttonEl);
        }`,
    );
    // Generate the function call for this block.
    const code = `${buttonGenCode}(${text},"${rootBlock.data}");\n`;
    return code;
  };
}

