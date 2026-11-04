import { toolboxLevel2 } from "../level2/toolbox";
import { mergeToolboxes } from "../mergeToolboxes";

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
