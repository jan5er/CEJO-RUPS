import { blocksLevel4, forBlockLevel4, toolboxLevel4 } from "./level4";
import {
  mergeToolboxes,
  registerBlocks,
  registerGenerators,
  switchBlock,
} from "./shared";

const ownBlocks = registerBlocks([switchBlock()]);
const ownGenerators = registerGenerators();

export const blocksLevel5 = [...blocksLevel4, ...ownBlocks];
export const forBlockLevel5 = { ...forBlockLevel4, ...ownGenerators };
export const toolboxLevel5 = mergeToolboxes(toolboxLevel4, {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Switch",
      colour: "#8957c5",
      contents: [{ kind: "block", type: "switch_statement" }],
    },
  ],
});
