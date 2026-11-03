import { blocksLevel3, forBlockLevel3, toolboxLevel3 } from "./level3";
import {
  ifBlock,
  mergeToolboxes,
  outputBlock,
  registerBlocks,
  registerGenerators,
  styledTextBlock,
  variableGetBlock,
  variableSetBlock,
} from "./shared";

const ownBlocksLevel4 = registerBlocks([
  outputBlock(4),
  styledTextBlock(4),
  variableSetBlock(4),
  variableGetBlock(4),
  ifBlock(4),
]);
const ownGeneratorsLevel4 = registerGenerators(4);

const ownToolboxLevel4 = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "If",
      colour: "#ff5d7a",
      contents: [
        { kind: "block", type: "level4_if" },
        { kind: "block", type: "logic_boolean" },
        { kind: "block", type: "logic_compare" },
      ],
    },
    {
      kind: "category",
      name: "Spremenljivke",
      colour: "#ff8a3d",
      contents: [
        { kind: "block", type: "level4_set_variable" },
        { kind: "block", type: "level4_get_variable" },
      ],
    },
    {
      kind: "category",
      name: "HTML in CSS",
      colour: "#4c6ef5",
      contents: [
        { kind: "block", type: "level4_styled_text" },
        { kind: "block", type: "level4_output" },
        { kind: "block", type: "text" },
      ],
    },
  ],
};

export const blocksLevel4 = [...blocksLevel3, ...ownBlocksLevel4];
export const forBlockLevel4 = { ...forBlockLevel3, ...ownGeneratorsLevel4 };
export const toolboxLevel4 = mergeToolboxes(toolboxLevel3, ownToolboxLevel4);
