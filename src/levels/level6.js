import { blocksLevel5, forBlockLevel5, toolboxLevel5 } from "./level5";
import {
  mergeToolboxes,
  outputBlock,
  registerBlocks,
  registerGenerators,
  repeatBlock,
  styledTextBlock,
} from "./shared";

const ownBlocksLevel6 = registerBlocks([
  outputBlock(6),
  styledTextBlock(6),
  repeatBlock(6),
]);
const ownGeneratorsLevel6 = registerGenerators(6);

const ownToolboxLevel6 = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Zanke",
      colour: "#ff5d7a",
      contents: [
        { kind: "block", type: "level6_repeat" },
        { kind: "block", type: "math_number" },
      ],
    },
    {
      kind: "category",
      name: "HTML in CSS",
      colour: "#4c6ef5",
      contents: [
        { kind: "block", type: "level6_styled_text" },
        { kind: "block", type: "level6_output" },
        { kind: "block", type: "text" },
      ],
    },
  ],
};

export const blocksLevel6 = [...blocksLevel5, ...ownBlocksLevel6];
export const forBlockLevel6 = { ...forBlockLevel5, ...ownGeneratorsLevel6 };
export const toolboxLevel6 = mergeToolboxes(toolboxLevel5, ownToolboxLevel6);
