import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { parentElement } from "./utils";

//Button element
export const button = {
  definition: namedBlock("Gumb", {
    type: "button_level1",
    tooltip: "",
    helpUrl: "",
    message0: "| Ime: %1",
    args0: [
      {
        type: "input_value",
        name: "TEXT",
        check: "String",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#da7d12",
  }),
  generator: (block, generator) => {
    const text = generator.valueToCode(block, "TEXT", Order.NONE) || "''";
    const buttonGenCode = generator.provideFunction_(
      "buttonGenCode",
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text, containerDiv) {
            const buttonEl = document.createElement('button');
            buttonEl.innerText = text;
            if (containerDiv) containerDiv.appendChild(buttonEl);
        }`,
    );
    return `${buttonGenCode}(${text}, ${parentElement(block)});\n`;
  },
};
