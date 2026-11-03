import { forBlockLevel1 } from "../utils/generator";

//JSON for representing container element for level 1
export const containerLevel1JSON = {
  type: "container_level1",
  tooltip: "Vsebnik elemente centrira na strani in dodano novo vrstico",
  helpUrl: "",
  message0: "Vsebnik %1",
  args0: [
    {
      type: "input_statement",
      name: "SUB_ELEMENTS",
    },
  ],
  colour: "#da7d12",
};

//Generator for container element
export const initGenContainer = () => {
  forBlockLevel1.container_level1 = (block, generator) => {
    const containerId = `Container${Math.floor(Math.random() * 100000)}`;
    block.data = containerId;
    const statement_sub_elements = generator.statementToCode(
      block,
      "SUB_ELEMENTS",
    );

    const containerGenCode = generator.provideFunction_(
      "containerGenCode",
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(containerId) {
                const outputDiv = document.getElementById('output');

                const divEl = document.createElement('div');
                divEl.id = containerId;
                divEl.style.width = "fit-content";
                divEl.style.marginLeft = "auto";
                divEl.style.marginRight = "auto";
                outputDiv.appendChild(divEl);

                ${statement_sub_elements}
        }`,
    );

    // Generate the function call for this block.
    const code = `${containerGenCode}("${containerId}");\n`;
    return code;
  };
};
