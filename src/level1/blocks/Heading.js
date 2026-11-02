//Treba narediti Heading, Input, simple text, combobox, container, image, button

import { Order } from 'blockly/javascript';
import { forBlock } from './generator';

//JSON for representing heading element for level 1
export const headingLevel1JSON = {
  "type": 'heading_level1',
  "tooltip": 'Naslov',
  "helpUrl": '',
  "message0": 'Naslov %1',
  "args0": [
    {
      "type": 'input_value',
      "name": 'TEXT',
      "check": 'String',
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 225,
};

//Generator for heading element
export const initGenHeading = () => {

  forBlock['heading_level1'] = (block, generator) => {
    const subStackTopBlock = block.getTopStackBlock();
    const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
    const headingGenCode = generator.provideFunction_(
      'headingGenCode',
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text, containerId) {
            const containerDiv = document.getElementById(containerId);
            const textEl = document.createElement('h1');
            textEl.innerText = text;
            containerDiv.appendChild(textEl);
        }`,
    );
    // Generate the function call for this block.
    const code = `${headingGenCode}(${text},${subStackTopBlock.id});\n`;
    return code;
  };
}

