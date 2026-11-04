import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";
import { parentElement } from "./utils";

//Select element with label
export const select = {
  definition: namedBlock("Izbirno polje", {
    type: "select_level1",
    tooltip: "Izbirno polje, ki shrani izbrano vrednost v spremenljivko",
    helpUrl: "",
    message0: "| Oznaka: %1  Vrednosti: %2",
    args0: [
      {
        type: "input_value",
        name: "LABEL_TEXT",
        check: "String",
      },
      {
        type: "input_value",
        name: "POSSIBLE_VALUES",
        check: "Array",
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: "#da7d12",
  }),
  generator: (block, generator) => {
    const labelText = generator.valueToCode(block, "LABEL_TEXT", Order.ATOMIC);
    const possibleValues = generator.valueToCode(
      block,
      "POSSIBLE_VALUES",
      Order.ATOMIC,
    );
    const selectGenCode = generator.provideFunction_(
      "selectGenCode",
      `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(labelText, possibleValues, containerDiv) {
                const name = "NamedSelect" + Math.floor(Math.random() * 100000);

                const labelEl = document.createElement('label');
                labelEl.for = name;
                labelEl.innerText = labelText;
                if (!containerDiv) return;
                containerDiv.appendChild(labelEl);

                const selectEl = document.createElement('select');
                selectEl.name = name;

                possibleValues.forEach((item) => {
                    const opt = document.createElement("option");
                    opt.value = item;
                    opt.text = item;
                    selectEl.add(opt);
                  }
                );

                containerDiv.appendChild(selectEl);

        }`,
    );
    return `${selectGenCode}(${labelText},${possibleValues}, ${parentElement(block)});\n`;
  },
};
