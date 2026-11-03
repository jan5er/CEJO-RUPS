import { blocksLevel1, forBlockLevel1 } from "../level1/utils/generator";
import { TOOLBOX as toolboxLevel1 } from "../level1/utils/toolbox";
import {
  mergeToolboxes,
  outputBlock,
  registerBlocks,
  registerGenerators,
  styledTextBlock,
} from "./shared";

const ownBlocksLevel2 = registerBlocks([outputBlock(2), styledTextBlock(2)]);
const ownGeneratorsLevel2 = registerGenerators(2);

const ownToolboxLevel2 = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "HTML in CSS",
      colour: "#4c6ef5",
      contents: [
        { kind: "block", type: "level2_styled_text" },
        { kind: "block", type: "level2_output" },
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

export const blocksLevel2 = [
  ...Object.values(blocksLevel1),
  ...ownBlocksLevel2,
];
export const forBlockLevel2 = { ...forBlockLevel1, ...ownGeneratorsLevel2 };
export const toolboxLevel2 = mergeToolboxes(toolboxLevel1, ownToolboxLevel2);
