import { Order } from "blockly/javascript";
import { forBlock } from "./generator";

//JSON for representing container element for level 1
export const containerLevel1JSON = {
  "type": "container_level1",
  "tooltip": "Vsebnik elemente centrira na strani in dodano novo vrstico",
  "helpUrl": "",
  "message0": "Vsebnik %1",
  "args0": [
    {
      "type": "input_statement",
      "name": "SUB_ELEMENTS"
    }
  ],
  "colour": 225
};

//Generator for container element
export const initGenContainer = () => {
    forBlock["container_level1"] = (block, generator) => {
        const blockId = block.id;

        const containerGenCode = generator.provideFunction_(
            "containerGenCode",
            `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(blockId) {
                const outputDiv = document.getElementById('output');

                const divEl = document.createElement('div');
                divEl.id = blockId;
                divEl.style.width = "fit-content";
                divEl.style.marginLeft = "auto";
                divEl.style.marginRight = "auto";
                outputDiv.appendChild(divEl);
        }`,
        );
        // Generate the function call for this block.
        const code = `${containerGenCode}(${blockId});\n`;
        return code;
    };
};
