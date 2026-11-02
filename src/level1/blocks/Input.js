import { Order } from 'blockly/javascript';
import { forBlock } from './generator';

//JSON for representing input element for level 1
export const inputLevel1JSON = {
  "type": "input_level1",
  "tooltip": "Vnosno polje, ki shrani spremembe v spremenljivko",
  "helpUrl": "",
  "message0": "Vnosno polje Oznaka: %1 Spremenljivka: %2 %3",
  "args0": [
    {
      "type": "input_value",
      "name": "LABEL_TEXT",
      "check": "String"
    },
    {
      "type": "field_variable",
      "name": "VAR_NAME",
      "variable": "item"
    },
    {
      "type": "input_dummy",
      "name": "VARIABLE_NAME_DUMMY"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 225
}

//Generator for input element
export const initGenInput = () => {
  forBlock['input_level1'] = (block, generator) => {
    const subStackTopBlock = block.getTopStackBlock();
    const labelText = generator.valueToCode(block, 'LABEL_TEXT', Order.ATOMIC);
    const varName = generator.getVariableName(block.getFieldValue('VAR_NAME'));

    const inputGenCode = generator.provideFunction_(
      'inputGenCode',
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(labelText, varName, containerId) {
                const containerDiv = document.getElementById(containerId);
                const name = "Named" + Math.floor(Math.random() * 100000);

                const labelEl = document.createElement('label');
                labelEl.for = name;
                labelEl.innerText = labelText;
                containerDiv.appendChild(labelEl);

                const inputEl = document.createElement('input');
                inputEl.type = "text";
                inputEl.name = name;
                inputEl.style.borderWidth = "1px";
                inputEl.style.borderStyle = "solid";
                containerDiv.appendChild(inputEl); 
                
                element.addEventListener("input", function(event) {
                    varName = event.target.value;
                });
        }`,
    );
    // Generate the function call for this block.
    const code = `${inputGenCode}(${labelText},${varName},${subStackTopBlock.id});\n`;
    return code;
  };
}

