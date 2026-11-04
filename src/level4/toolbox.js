import { toolboxLevel3 } from "../level3/toolbox";
import { mergeToolboxes } from "../mergeToolboxes";

export const toolboxLevel4 = mergeToolboxes(toolboxLevel3, {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Spremenljivke",
      colour: "#ff8a3d",
      contents: [
        { kind: "block", type: "variable_set" },
        { kind: "block", type: "variable_get" },
      ],
    },
    {
      kind: "category",
      name: "Pogoji",
      colour: "#ff5d7a",
      contents: [
        { kind: "block", type: "if_statement" },
        { kind: "block", type: "logic_compare" },
        { kind: "block", type: "logic_boolean" },
      ],
    },
  ],
});
