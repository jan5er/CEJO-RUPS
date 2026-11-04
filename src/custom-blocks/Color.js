import { Order } from "blockly/javascript";
import { namedBlock } from "../blockNames";

export const color = {
  definition: namedBlock("barva", {
    type: "color_value",
    message0: "%1",
    args0: [
      {
        type: "field_dropdown",
        name: "COLOR",
        options: [
          ["črna", "#000000"],
          ["bela", "#ffffff"],
          ["rdeča", "#e03131"],
          ["zelena", "#2f9e44"],
          ["modra", "#1971c2"],
          ["rumena", "#f08c00"],
        ],
      },
    ],
    output: "String",
    colour: 20,
  }),
  generator: (block) => [
    JSON.stringify(block.getFieldValue("COLOR") || "#000000"),
    Order.ATOMIC,
  ],
};
