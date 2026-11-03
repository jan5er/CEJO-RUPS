import { blocksLevel6, forBlockLevel6, toolboxLevel6 } from "./level6";
import {
  ifBlock,
  mergeToolboxes,
  outputBlock,
  registerBlocks,
  registerGenerators,
  repeatBlock,
  switchBlock,
  variableGetBlock,
  variableSetBlock,
} from "./shared";

const ownBlocksLevel7 = registerBlocks([
  outputBlock(7, false),
  variableSetBlock(7),
  variableGetBlock(7),
  ifBlock(7),
  switchBlock(7),
  repeatBlock(7),
]);
const ownGeneratorsLevel7 = registerGenerators(7, {
  preview: false,
});

const ownToolboxLevel7 = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Konzola",
      colour: "#2fb344",
      contents: [
        { kind: "block", type: "level7_output" },
        { kind: "block", type: "text_print" },
        { kind: "block", type: "text" },
      ],
    },
    {
      kind: "category",
      name: "Spremenljivke",
      colour: "#ff8a3d",
      contents: [
        { kind: "block", type: "level7_set_variable" },
        { kind: "block", type: "level7_get_variable" },
      ],
    },
    {
      kind: "category",
      name: "Nadzor",
      colour: "#ff5d7a",
      contents: [
        { kind: "block", type: "level7_if" },
        { kind: "block", type: "level7_switch" },
        { kind: "block", type: "level7_repeat" },
        { kind: "block", type: "math_number" },
        { kind: "block", type: "logic_boolean" },
      ],
    },
  ],
};

export const blocksLevel7 = [...blocksLevel6, ...ownBlocksLevel7];
export const forBlockLevel7 = { ...forBlockLevel6, ...ownGeneratorsLevel7 };
export const toolboxLevel7 = mergeToolboxes(toolboxLevel6, ownToolboxLevel7);
