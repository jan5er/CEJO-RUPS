import { Order } from "blockly/javascript";
import { namedBlock } from "../../blockNames";
import { forBlockLevel1 } from "../utils/generator";

//JSON for representing checkbox element for level 1
export const checkboxLevel1JSON = namedBlock("Potrditveno polje", {
  type: "checkbox_level1",
  tooltip: "Potrditveno polje, ki shrani drži/ne drži v spremenljivko",
  helpUrl: "",
  message0: "| Oznaka: %1",
  args0: [
    {
      type: "input_value",
      name: "LABEL_TEXT",
      check: "String",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#da7d12",
});

//Generator for checkbox element
export const initGenCombobox = () => {
  forBlockLevel1.checkbox_level1 = (block, generator) => {
    const rootBlock = block.getRootBlock();
    const labelText = generator.valueToCode(block, "LABEL_TEXT", Order.ATOMIC);

    const checkboxGenCode = generator.provideFunction_(
      "checkboxGenCode",
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(labelText, containerId) {
                const containerDiv = document.getElementById(containerId) || document.getElementById('output');
                const name = "NamedCheckbox" + Math.floor(Math.random() * 100000);

                const labelEl = document.createElement('label');
                labelEl.for = name;
                labelEl.innerText = labelText;
                if (!containerDiv) return;
                containerDiv.appendChild(labelEl);

                const inputEl = document.createElement('input');
                inputEl.type = "checkbox";
                inputEl.name = name;
                containerDiv.appendChild(inputEl);
        }`,
    );
    // Generate the function call for this block.
    const code = `${checkboxGenCode}(${labelText},"${rootBlock.data}");\n`;
    return code;
  };
};
