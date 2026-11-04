import { Order } from "blockly/javascript";
import { namedBlock } from "../../blockNames";
import { forBlockLevel1 } from "../utils/generator";
import { parentElement } from "../utils/parent";

//JSON for representing heading element for level 1
export const headingLevel1JSON = namedBlock("Naslov", {
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
});

//Generator for heading element
export const initGenHeading = () => {
  forBlockLevel1.heading_level1 = (block, generator) => {
    const text = generator.valueToCode(block, "TEXT", Order.NONE) || "''";
    const headingGenCode = generator.provideFunction_(
      "headingGenCode",
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text, containerDiv) {
            const textEl = document.createElement('h1');
            textEl.innerText = text;
            if (containerDiv) containerDiv.appendChild(textEl);
        }`,
    );
    // Generate the function call for this block.
    const code = `${headingGenCode}(${text}, ${parentElement(block)});\n`;
    return code;
  };
};
