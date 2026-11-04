import { namedBlock } from "../blockNames";

//Page root block: everything inside it is rendered, in stacking order
export const page = {
  definition: namedBlock("Stran", {
    type: "page_level1",
    tooltip: "Vsebina spletne strani. Prikaže se vse, kar je v tem bloku.",
    helpUrl: "",
    message0: "%1",
    args0: [
      {
        type: "input_statement",
        name: "CONTENT",
      },
    ],
    style: { hat: "cap" },
    colour: "#da7d12",
  }),
  generator: (block, generator) => generator.statementToCode(block, "CONTENT"),
};
