import { blocksLevel3, forBlockLevel3, toolboxLevel3 } from "./level3";
import {
  ifBlock,
  mergeToolboxes,
  registerBlocks,
  registerGenerators,
  variableGetBlock,
  variableSetBlock,
} from "./shared";

const ownBlocks = registerBlocks([
  variableSetBlock(),
  variableGetBlock(),
  ifBlock(),
]);
const ownGenerators = registerGenerators();

export const blocksLevel4 = [...blocksLevel3, ...ownBlocks];
export const forBlockLevel4 = { ...forBlockLevel3, ...ownGenerators };
export const toolboxLevel4 = mergeToolboxes(toolboxLevel3, {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Spremenljivke",
      colour: "#ff8a3d",
      contents: [
        { kind: "block", type: "variable_set" },
        { kind: "block", type: "variable_get" },
      ],
    },
    {
      kind: "category",
      name: "Pogoji",
      colour: "#ff5d7a",
      contents: [
        { kind: "block", type: "if_statement" },
        { kind: "block", type: "logic_compare" },
        { kind: "block", type: "logic_boolean" },
      ],
    },
  ],
});
