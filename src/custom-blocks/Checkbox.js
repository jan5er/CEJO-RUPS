import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { parentElement } from "./utils";

//Checkbox element with label
export const checkbox = {
  definition: namedBlock("Potrditveno polje", {
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
  }),
  generator: (block, generator) => {
    const labelText = generator.valueToCode(block, "LABEL_TEXT", Order.ATOMIC);
    const checkboxGenCode = generator.provideFunction_(
      "checkboxGenCode",
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(labelText, containerDiv) {
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
    return `${checkboxGenCode}(${labelText}, ${parentElement(block)});\n`;
  },
};
