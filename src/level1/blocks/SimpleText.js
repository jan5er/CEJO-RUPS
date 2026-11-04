import { Order } from "blockly/javascript";
import { namedBlock } from "../../blockNames";
import { forBlockLevel1 } from "../utils/generator";

//JSON for representing simple text element for level 1
export const simpleTextLevel1JSON = namedBlock("Preprosto besedilo", {
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
});

//Generator for simple text element
export const initGenSimpleText = () => {
  forBlockLevel1.text_simple_level1 = (block, generator) => {
    const rootBlock = block.getRootBlock();
    const text = generator.valueToCode(block, "TEXT", Order.ATOMIC);

    const simpleTextGenCode = generator.provideFunction_(
      "simpleTextGenCode",
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text, containerId) {
                const containerDiv = document.getElementById(containerId) || document.getElementById('output');

                const textlEl = document.createElement('p');
                textlEl.innerText = text;
                if (containerDiv) containerDiv.appendChild(textlEl);
        }`,
    );
    // Generate the function call for this block.
    const code = `${simpleTextGenCode}(${text},"${rootBlock.data}");\n`;
    return code;
  };
};
