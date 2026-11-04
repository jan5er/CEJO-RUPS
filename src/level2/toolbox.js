import { toolboxLevel1 } from "../level1/toolbox";
import { mergeToolboxes } from "../mergeToolboxes";

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
