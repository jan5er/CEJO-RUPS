import { namedBlock } from "../blockNames";
import { containerVariable, parentElement } from "./utils";

//Container element (div)
export const container = {
  definition: namedBlock("Vsebnik", {
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
  }),
  generator: (block, generator) => {
    const statement_sub_elements = generator.statementToCode(
      block,
      "SUB_ELEMENTS",
    );

    // provideFunction_ caches by name, so the helper must not contain this block's children,
    // otherwise every container would reuse the children of the first one
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
    return `{\n  const ${containerVariable(block)} = ${containerGenCode}(${parentElement(block)});\n${statement_sub_elements}}\n`;
  },
};
