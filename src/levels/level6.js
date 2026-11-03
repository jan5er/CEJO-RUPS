import { blocksLevel5, forBlockLevel5, toolboxLevel5 } from "./level5";
import {
  mergeToolboxes,
  registerBlocks,
  registerGenerators,
  repeatBlock,
} from "./shared";

const ownBlocks = registerBlocks([repeatBlock()]);
const ownGenerators = registerGenerators();

export const blocksLevel6 = [...blocksLevel5, ...ownBlocks];
export const forBlockLevel6 = { ...forBlockLevel5, ...ownGenerators };
export const toolboxLevel6 = mergeToolboxes(toolboxLevel5, {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Zanke",
      colour: "#e8590c",
      contents: [
        { kind: "block", type: "repeat_loop" },
        { kind: "block", type: "math_number" },
      ],
    },
  ],
});
