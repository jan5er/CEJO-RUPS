import { namedBlock } from "../../blockNames";
import { forBlockLevel1 } from "../utils/generator";
import { containerVariable, parentElement } from "../utils/parent";

//JSON for representing container element for level 1
export const containerLevel1JSON = namedBlock("Vsebnik", {
  type: "container_level1",
  tooltip: "Vsebnik elemente centrira na strani in dodano novo vrstico",
  helpUrl: "",
  message0: "%1",
  args0: [
    {
      type: "input_statement",
      name: "SUB_ELEMENTS",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: "#da7d12",
});

//Generator for container element
export const initGenContainer = () => {
  forBlockLevel1.container_level1 = (block, generator) => {
    const statement_sub_elements = generator.statementToCode(
      block,
      "SUB_ELEMENTS",
    );

    const containerGenCode = generator.provideFunction_(
      "containerGenCode",
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(parent) {
                const divEl = document.createElement('div');
                divEl.style.width = "fit-content";
                divEl.style.marginLeft = "auto";
                divEl.style.marginRight = "auto";
                if (parent) parent.appendChild(divEl);
                return divEl;
        }`,
    );

    // Create the div, then generate the children inside a scope where it's available to them.
    const code = `{\n  const ${containerVariable(block)} = ${containerGenCode}(${parentElement(block)});\n${statement_sub_elements}}\n`;
    return code;
  };
};
