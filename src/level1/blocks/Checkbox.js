import { Order } from 'blockly/javascript';
import { forBlock } from './generator';

//JSON for representing checkbox element for level 1
export const checkboxLevel1JSON = {
  "type": "checkbox_level1",
  "tooltip": "Potrditveno polje, ki shrani drži/ne drži v spremenljivko",
  "helpUrl": "",
  "message0": "Potrditveno polje | Oznaka: %1 Spremenljivka: %2 %3",
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
};

//Generator for checkbox element
export const initGenCombobox = () => {
  forBlock['checkbox_level1'] = (block, generator) => {
    const subStackTopBlock = block.getTopStackBlock();
    const labelText = generator.valueToCode(block, 'LABEL_TEXT', Order.ATOMIC);
    const varName = generator.getVariableName(block.getFieldValue('VAR_NAME'));

    const checkboxGenCode = generator.provideFunction_(
      'checkboxGenCode',
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(labelText, varName, containerId) {
                const containerDiv = document.getElementById(containerId);
                const name = "NamedCheckbox" + Math.floor(Math.random() * 100000);

                const labelEl = document.createElement('label');
                labelEl.for = name;
                labelEl.innerText = labelText;
                containerDiv.appendChild(labelEl);

                const inputEl = document.createElement('input');
                inputEl.type = "checkbox";
                inputEl.name = name;
                containerDiv.appendChild(inputEl); 
                
                inputEl.addEventListener("click", function(event) {
                    varName = inputEl.checked;
                });
        }`,
    );
    // Generate the function call for this block.
    const code = `${checkboxGenCode}(${labelText},${varName},${subStackTopBlock.id});\n`;
    return code;
  };
}

