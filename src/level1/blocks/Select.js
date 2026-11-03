import { Order } from 'blockly/javascript';
import { forBlockLevel1 } from "../utils/generator";

//JSON for representing select element for level 1
export const selectLevel1JSON = {
  "type": "select_level1",
  "tooltip": "Izbirno polje, ki shrani izbrano vrednost v spremenljivko",
  "helpUrl": "",
  "message0": "Izbirno polje | Oznaka: %1  Vrednosti: %2",
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
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": "#da7d12"
};

//Generator for select element
export const initGenSelect = () => {
  forBlockLevel1['select_level1'] = (block, generator) => {
    const rootBlock = block.getRootBlock();
    const labelText = generator.valueToCode(block, 'LABEL_TEXT', Order.ATOMIC);
    const possibleValues = generator.valueToCode(block, 'POSSIBLE_VALUES', Order.ATOMIC);

    //console.log(possibleValues);

    const selectGenCode = generator.provideFunction_(
      'selectGenCode',
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(labelText, possibleValues, containerId) {
                const containerDiv = document.getElementById(containerId) || document.getElementById('output');
                const name = "NamedSelect" + Math.floor(Math.random() * 100000);

                const labelEl = document.createElement('label');
                labelEl.for = name;
                labelEl.innerText = labelText;
                if (!containerDiv) return;
                containerDiv.appendChild(labelEl);

                const selectEl = document.createElement('select');
                selectEl.name = name;

                possibleValues.forEach((item) => {
                    const opt = document.createElement("option");
                    opt.value = item;
                    opt.text = item;
                    selectEl.add(opt);
                  }
                );

                containerDiv.appendChild(selectEl); 
                  
        }`,
    );
    
    // Generate the function call for this block.
    const code = `${selectGenCode}(${labelText},${possibleValues},"${rootBlock.data}");\n`;
    return code;
  };
}
