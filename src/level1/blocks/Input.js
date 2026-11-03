import { Order } from "blockly/javascript";
import { forBlockLevel1 } from "../utils/generator";

//JSON for representing input element for level 1
export const inputLevel1JSON = {
  type: "input_level1",
  tooltip: "Vnosno polje, ki shrani spremembe v spremenljivko",
  helpUrl: "",
  message0: "Vnosno polje | Oznaka: %1",
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
};

//Generator for input element
export const initGenInput = () => {
  forBlockLevel1.input_level1 = (block, generator) => {
    const rootBlock = block.getRootBlock();
    const labelText = generator.valueToCode(block, "LABEL_TEXT", Order.ATOMIC);

    const inputGenCode = generator.provideFunction_(
      "inputGenCode",
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(labelText, containerId) {
                const containerDiv = document.getElementById(containerId) || document.getElementById('output');
                const name = "Input" + Math.floor(Math.random() * 100000);

                const labelEl = document.createElement('label');
                labelEl.for = name;
                labelEl.innerText = labelText;
                if (!containerDiv) return;
                containerDiv.appendChild(labelEl);

                const inputEl = document.createElement('input');
                inputEl.type = "text";
                inputEl.name = name;
                inputEl.style.borderWidth = "1px";
                inputEl.style.borderStyle = "solid";
                containerDiv.appendChild(inputEl);
        }`,
    );
    // Generate the function call for this block.
    const code = `${inputGenCode}(${labelText},"${rootBlock.data}");\n`;
    return code;
  };
};
