import { blocksLevel2, forBlockLevel2, toolboxLevel2 } from "./level2";
import {
  buttonActionBlock,
  inputBlock,
  mergeToolboxes,
  outputBlock,
  registerBlocks,
  registerGenerators,
  styledTextBlock,
  textBlock,
  variableGetBlock,
  variableSetBlock,
} from "./shared";

const ownBlocksLevel3 = registerBlocks([
  outputBlock(3),
  textBlock(3),
  styledTextBlock(3),
  variableSetBlock(3),
  variableGetBlock(3),
  inputBlock(3),
  buttonActionBlock(3),
]);
const ownGeneratorsLevel3 = registerGenerators(3);

const ownToolboxLevel3 = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Spremenljivke",
      colour: "#ff8a3d",
      contents: [
        { kind: "block", type: "level3_set_variable" },
        { kind: "block", type: "level3_get_variable" },
        { kind: "block", type: "level3_input" },
        { kind: "block", type: "level3_button_action" },
      ],
    },
    {
      kind: "category",
      name: "HTML in CSS",
      colour: "#4c6ef5",
      contents: [
        { kind: "block", type: "level3_styled_text" },
        { kind: "block", type: "level3_output" },
      ],
    },
    {
      kind: "category",
      name: "Besedilo",
      colour: "#2fb344",
      contents: [{ kind: "block", type: "text" }],
    },
  ],
};

export const blocksLevel3 = [...blocksLevel2, ...ownBlocksLevel3];
export const forBlockLevel3 = { ...forBlockLevel2, ...ownGeneratorsLevel3 };
export const toolboxLevel3 = mergeToolboxes(toolboxLevel2, ownToolboxLevel3);
