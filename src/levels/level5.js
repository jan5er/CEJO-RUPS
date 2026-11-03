import { blocksLevel4, forBlockLevel4, toolboxLevel4 } from "./level4";
import {
  mergeToolboxes,
  outputBlock,
  registerBlocks,
  registerGenerators,
  styledTextBlock,
  switchBlock,
  variableGetBlock,
  variableSetBlock,
} from "./shared";

const ownBlocksLevel5 = registerBlocks([
  outputBlock(5),
  styledTextBlock(5),
  variableSetBlock(5),
  variableGetBlock(5),
  switchBlock(5),
]);
const ownGeneratorsLevel5 = registerGenerators(5);

const ownToolboxLevel5 = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Switch",
      colour: "#ff5d7a",
      contents: [{ kind: "block", type: "level5_switch" }],
    },
    {
      kind: "category",
      name: "Spremenljivke",
      colour: "#ff8a3d",
      contents: [
        { kind: "block", type: "level5_set_variable" },
        { kind: "block", type: "level5_get_variable" },
      ],
    },
    {
      kind: "category",
      name: "HTML in CSS",
      colour: "#4c6ef5",
      contents: [
        { kind: "block", type: "level5_styled_text" },
        { kind: "block", type: "level5_output" },
        { kind: "block", type: "text" },
      ],
    },
  ],
};

export const blocksLevel5 = [...blocksLevel4, ...ownBlocksLevel5];
export const forBlockLevel5 = { ...forBlockLevel4, ...ownGeneratorsLevel5 };
export const toolboxLevel5 = mergeToolboxes(toolboxLevel4, ownToolboxLevel5);
