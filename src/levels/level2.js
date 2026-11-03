import { blocksLevel1, forBlockLevel1 } from "../level1/utils/generator";
import { TOOLBOX as toolboxLevel1 } from "../level1/utils/toolbox";
import {
  htmlElementBlock,
  mergeToolboxes,
  registerBlocks,
  registerGenerators,
} from "./shared";

const ownBlocks = registerBlocks([htmlElementBlock()]);
const ownGenerators = registerGenerators();

export const blocksLevel2 = [...Object.values(blocksLevel1), ...ownBlocks];
export const forBlockLevel2 = { ...forBlockLevel1, ...ownGenerators };
export const toolboxLevel2 = mergeToolboxes(toolboxLevel1, {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "HTML",
      colour: "#4c6ef5",
      contents: [{ kind: "block", type: "html_element" }],
    },
    {
      kind: "category",
      name: "Vrednosti",
      colour: "#2fb344",
      contents: [{ kind: "block", type: "text" }],
    },
  ],
});
