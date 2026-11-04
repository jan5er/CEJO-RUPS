import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { parentElement } from "./utils";

//Simple text element (p)
export const simpleText = {
  definition: namedBlock("Preprosto besedilo", {
    type: "text_simple_level1",
    tooltip: "Preprosto besedilo",
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
    const text = generator.valueToCode(block, "TEXT", Order.ATOMIC);
    const simpleTextGenCode = generator.provideFunction_(
      "simpleTextGenCode",
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text, containerDiv) {
                const textlEl = document.createElement('p');
                textlEl.innerText = text;
                if (containerDiv) containerDiv.appendChild(textlEl);
        }`,
    );
    return `${simpleTextGenCode}(${text}, ${parentElement(block)});\n`;
  },
};
