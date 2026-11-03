import { blocksLevel6, forBlockLevel6 } from "./level6";
import {
  consoleOutputBlock,
  registerBlocks,
  registerGenerators,
} from "./shared";

const ownBlocks = registerBlocks([consoleOutputBlock()]);
const ownGenerators = registerGenerators();

export const blocksLevel7 = [...blocksLevel6, ...ownBlocks];
export const forBlockLevel7 = { ...forBlockLevel6, ...ownGenerators };
export const toolboxLevel7 = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Konzola",
      colour: "#2fb344",
      contents: [
        { kind: "block", type: "console_output" },
        { kind: "block", type: "text" },
        { kind: "block", type: "math_number" },
      ],
    },
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
      name: "Nadzor",
      colour: "#ff5d7a",
      contents: [
        { kind: "block", type: "if_statement" },
        { kind: "block", type: "switch_statement" },
        { kind: "block", type: "repeat_loop" },
        { kind: "block", type: "logic_compare" },
        { kind: "block", type: "logic_boolean" },
      ],
    },
  ],
};
