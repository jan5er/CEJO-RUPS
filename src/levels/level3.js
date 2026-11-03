import { blocksLevel2, forBlockLevel2, toolboxLevel2 } from "./level2";
import {
  colorBlock,
  cssStyleBlock,
  mergeToolboxes,
  registerBlocks,
  registerGenerators,
} from "./shared";

const ownBlocks = registerBlocks([cssStyleBlock(), colorBlock()]);
const ownGenerators = registerGenerators();

export const blocksLevel3 = [...blocksLevel2, ...ownBlocks];
export const forBlockLevel3 = { ...forBlockLevel2, ...ownGenerators };
export const toolboxLevel3 = mergeToolboxes(toolboxLevel2, {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "CSS",
      colour: "#19a974",
      contents: [
        { kind: "block", type: "css_style" },
        { kind: "block", type: "color_value" },
        { kind: "block", type: "math_number" },
      ],
    },
    {
      kind: "category",
      name: "Vrednosti",
      colour: "#2fb344",
      contents: [{ kind: "block", type: "text" }],
    },
  ],
});
