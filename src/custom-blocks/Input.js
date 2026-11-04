import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { parentElement } from "./utils";

//Input element with label
export const input = {
  definition: namedBlock("Vnosno polje", {
    type: "input_level1",
    tooltip: "Vnosno polje, ki shrani spremembe v spremenljivko",
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
    const inputGenCode = generator.provideFunction_(
      "inputGenCode",
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(labelText, containerDiv) {
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
    return `${inputGenCode}(${labelText}, ${parentElement(block)});\n`;
  },
};
