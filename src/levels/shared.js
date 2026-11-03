import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

const valueInput = (name, check = "String") => ({
  type: "input_value",
  name,
  check,
});

export function colorBlock() {
  return {
    type: "color_value",
    message0: "barva %1",
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
  };
}

export function htmlElementBlock() {
  return {
    type: "html_element",
    message0: "HTML %1 id %2 vsebina %3",
    args0: [
      {
        type: "field_dropdown",
        name: "TAG",
        options: [
          ["h1", "h1"],
          ["h2", "h2"],
          ["p", "p"],
          ["small", "small"],
          ["i", "i"],
          ["input", "input"],
        ],
      },
      { type: "field_input", name: "ID", text: "element" },
      valueInput("TEXT"),
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  };
}

export function cssStyleBlock() {
  return {
    type: "css_style",
    message0: "CSS za %1 velikost %2 barva %3 teža %4 margin %5 padding %6",
    args0: [
      { type: "field_input", name: "ID", text: "element" },
      valueInput("FONT_SIZE", "Number"),
      valueInput("COLOR", "String"),
      valueInput("FONT_WEIGHT", "Number"),
      valueInput("MARGIN", "Number"),
      valueInput("PADDING", "Number"),
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 160,
  };
}

export function variableSetBlock() {
  return {
    type: "variable_set",
    message0: "nastavi spremenljivko %1 na %2",
    args0: [
      { type: "field_input", name: "NAME", text: "vrednost" },
      valueInput("VALUE"),
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  };
}

export function variableGetBlock() {
  return {
    type: "variable_get",
    message0: "vrednost spremenljivke %1",
    args0: [{ type: "field_input", name: "NAME", text: "vrednost" }],
    output: null,
    colour: 330,
  };
}

export function ifBlock() {
  return {
    type: "if_statement",
    message0: "če %1 potem %2",
    args0: [
      valueInput("CONDITION", "Boolean"),
      { type: "input_statement", name: "DO" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  };
}

export function switchBlock() {
  return {
    type: "switch_statement",
    message0: "switch ( %1 ) case %2: %3 case %4: %5 case %6: %7 default: %8",
    args0: [
      valueInput("VALUE"),
      valueInput("CASE"),
      { type: "input_statement", name: "DO" },
      valueInput("CASE_2"),
      { type: "input_statement", name: "DO_2" },
      valueInput("CASE_3"),
      { type: "input_statement", name: "DO_3" },
      { type: "input_statement", name: "DEFAULT" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  };
}

export function repeatBlock() {
  return {
    type: "repeat_loop",
    message0: "ponovi %1 krat %2",
    args0: [
      valueInput("TIMES", "Number"),
      { type: "input_statement", name: "DO" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 290,
  };
}

export function consoleOutputBlock() {
  return {
    type: "console_output",
    message0: "izpiši v konzolo %1",
    args0: [valueInput("VALUE")],
    previousStatement: null,
    nextStatement: null,
    colour: 120,
  };
}

export function registerBlocks(definitions) {
  const blocks =
    Blockly.common.createBlockDefinitionsFromJsonArray(definitions);
  Blockly.common.defineBlocks(blocks);
  return Object.values(blocks);
}

export function registerGenerators() {
  const generators = Object.create(null);

  generators.html_element = (block, generator) => {
    const tag = block.getFieldValue("TAG") || "p";
    const id = block.getFieldValue("ID") || "element";
    const text = generator.valueToCode(block, "TEXT", Order.ATOMIC) || '""';
    return `{ const name = "NamedElement" + Math.floor(Math.random() * 100000); const element = document.createElement("${tag}"); element.id = "${id}"; element.name = name; element.${tag === "input" ? "placeholder" : "textContent"} = ${text}; const output = document.getElementById("output"); if (output) output.appendChild(element); }\n`;
  };

  generators.css_style = (block, generator) => {
    const numberValue = (name) =>
      generator.valueToCode(block, name, Order.ATOMIC) || "0";
    const color =
      generator.valueToCode(block, "COLOR", Order.ATOMIC) || '"#000000"';
    const id = block.getFieldValue("ID") || "element";
    return `{ const element = document.getElementById("${id}"); if (element) { element.style.fontSize = ${numberValue("FONT_SIZE")} + "px"; element.style.color = ${color}; element.style.fontWeight = Math.min(900, Math.max(100, ${numberValue("FONT_WEIGHT")} * 100)); element.style.margin = ${numberValue("MARGIN")} + "px"; element.style.padding = ${numberValue("PADDING")} + "px"; } }\n`;
  };

  generators.color_value = (block) => [
    JSON.stringify(block.getFieldValue("COLOR") || "#000000"),
    Order.ATOMIC,
  ];

  generators.variable_set = (block, generator) => {
    const name = block.getFieldValue("NAME") || "vrednost";
    const value = generator.valueToCode(block, "VALUE", Order.ATOMIC) || '""';
    return `globalThis.__programVariables = globalThis.__programVariables || {}; globalThis.__programVariables["${name}"] = ${value};\n`;
  };

  generators.variable_get = (block) => [
    `globalThis.__programVariables?.["${block.getFieldValue("NAME") || "vrednost"}"] ?? ""`,
    Order.ATOMIC,
  ];

  generators.if_statement = (block, generator) => {
    const condition =
      generator.valueToCode(block, "CONDITION", Order.NONE) || "false";
    return `if (${condition}) {\n${generator.statementToCode(block, "DO")}}\n`;
  };

  generators.switch_statement = (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", Order.NONE) || '""';
    const caseValue = (name) =>
      generator.valueToCode(block, name, Order.NONE) || '""';
    const caseCode = (name) => generator.statementToCode(block, name);
    const defaultCode = generator.statementToCode(block, "DEFAULT");
    return `switch (${value}) {
  case ${caseValue("CASE")}:
${caseCode("DO")}    break;
  case ${caseValue("CASE_2")}:
${caseCode("DO_2")}    break;
  case ${caseValue("CASE_3")}:
${caseCode("DO_3")}    break;
  default:
${defaultCode}}\n`;
  };

  generators.repeat_loop = (block, generator) => {
    const times = generator.valueToCode(block, "TIMES", Order.NONE) || "0";
    return `{ for (let index = 0; index < ${times}; index++) {\n${generator.statementToCode(block, "DO")}} }\n`;
  };

  generators.console_output = (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", Order.ATOMIC) || '""';
    return `console.log(${value});\n`;
  };

  Object.assign(javascriptGenerator.forBlock, generators);
  return generators;
}

export function mergeToolboxes(...toolboxes) {
  const categories = new Map();
  for (const toolbox of toolboxes) {
    for (const item of toolbox.contents) {
      if (item.kind !== "category") continue;
      const current = categories.get(item.name);
      if (current) {
        current.contents.push(...(item.contents ?? []));
      } else {
        categories.set(item.name, {
          ...item,
          contents: [...(item.contents ?? [])],
        });
      }
    }
  }
  return { kind: "categoryToolbox", contents: [...categories.values()] };
}
