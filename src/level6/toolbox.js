import { toolboxLevel5 } from "../level5/toolbox";
import { mergeToolboxes } from "../mergeToolboxes";

export const toolboxLevel6 = mergeToolboxes(toolboxLevel5, {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Zanke",
      colour: "#e8590c",
      contents: [
        { kind: "block", type: "repeat_loop" },
        { kind: "block", type: "math_number" },
      ],
    },
  ],
});
