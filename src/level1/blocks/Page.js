import { namedBlock } from "../../blockNames";
import { forBlockLevel1 } from "../utils/generator";

export const pageLevel1JSON = namedBlock("Stran", {
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
});

export const initGenPage = () => {
  forBlockLevel1.page_level1 = (block, generator) =>
    generator.statementToCode(block, "CONTENT");
};
