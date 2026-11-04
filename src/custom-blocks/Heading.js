import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { parentElement } from "./utils";

//Heading element (h1)
export const heading = {
  definition: namedBlock("Naslov", {
    type: "heading_level1",
    tooltip: "Naslov",
    helpUrl: "",
    message0: "%1",
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
    const headingGenCode = generator.provideFunction_(
      "headingGenCode",
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text, containerDiv) {
            const textEl = document.createElement('h1');
            textEl.innerText = text;
            if (containerDiv) containerDiv.appendChild(textEl);
        }`,
    );
    return `${headingGenCode}(${text}, ${parentElement(block)});\n`;
  },
};
