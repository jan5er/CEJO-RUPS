import { Order } from 'blockly/javascript';
import { forBlock } from './generator';

//JSON for representing select element for level 1
export const selectLevel1JSON = {
  "type": "select_level1",
  "tooltip": "Izbirno polje, ki shrani izbrano vrednost v spremenljivko",
  "helpUrl": "",
  "message0": "Izbirno polje | Oznaka: %1  Vrednosti: %2 Spremeljivka: %3 %4",
  "args0": [
    {
      "type": "input_value",
      "name": "LABEL_TEXT",
      "check": "String"
    },
    {
      "type": "input_value",
      "name": "POSSIBLE_VALUES",
      "check": "Array"
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
  "colour": 225
};

//Generator for select element
export const initGenSelect = () => {
  forBlock['select_level1'] = (block, generator) => {
    const subStackTopBlock = block.getTopStackBlock();
    const labelText = generator.valueToCode(block, 'LABEL_TEXT', Order.ATOMIC);
    const possibleValues = generator.valueToCode(block, 'POSSIBLE_VALUES', Order.ATOMIC);
    const varName = generator.getVariableName(block.getFieldValue('VAR_NAME'));

    const selectGenCode = generator.provideFunction_(
      'selectGenCode',
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(labelText, varName, possibleValues, containerId) {
                const containerDiv = document.getElementById(containerId);
                const name = "NamedSelect" + Math.floor(Math.random() * 100000);

                const labelEl = document.createElement('label');
                labelEl.for = name;
                labelEl.innerText = labelText;
                containerDiv.appendChild(labelEl);

                const selectEl = document.createElement('select');
                selectEl.name = name;
                
                //TODO: Posodobi da dela
                //for (let i = 0; i<= 233; i++){
                //  const opt = document.createElement("option");
                //  opt.value = "3";
                //  opt.text = "Option: Value 3";
                //  selectEl.add(opt1, null);
                //} 

                containerDiv.appendChild(selectEl); 
                  
                selectEl.addEventListener("change", function(event) {
                    varName = selectEl.options[selectEl.selectedIndex].text;
                });
        }`,
    );
    
    // Generate the function call for this block.
    const code = `${selectGenCode}(${labelText},${varName},${possibleValues},${subStackTopBlock.id});\n`;
    return code;
  };
}

