import { toolboxLevel4 } from "../level4/toolbox";
import { mergeToolboxes } from "../mergeToolboxes";

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
