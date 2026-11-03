import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

const valueInput = (name, check = "String") => ({
  type: "input_value",
  name,
  check,
});

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
      valueInput("FONT_SIZE"),
      valueInput("COLOR"),
      valueInput("FONT_WEIGHT"),
      valueInput("MARGIN"),
      valueInput("PADDING"),
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
    message0: "switch %1 primer %2 naredi %3 sicer %4",
    args0: [
      valueInput("VALUE"),
      valueInput("CASE"),
      { type: "input_statement", name: "DO" },
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
    return `{ const name = "NamedElement" + Math.floor(Math.random() * 100000); const element = document.createElement("${tag}"); element.id = "${id}"; element.name = name; element.${tag === "input" ? "placeholder" : "textContent"} = ${text}; document.getElementById("output").appendChild(element); }\n`;
  };

  generators.css_style = (block, generator) => {
    const value = (name) =>
      generator.valueToCode(block, name, Order.ATOMIC) || '""';
    const id = block.getFieldValue("ID") || "element";
    return `{ const element = document.getElementById("${id}"); if (element) { element.style.fontSize = ${value("FONT_SIZE")}; element.style.color = ${value("COLOR")}; element.style.fontWeight = ${value("FONT_WEIGHT")}; element.style.margin = ${value("MARGIN")}; element.style.padding = ${value("PADDING")}; } }\n`;
  };

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
    const caseValue = generator.valueToCode(block, "CASE", Order.NONE) || '""';
    return `switch (${value}) { case ${caseValue}:\n${generator.statementToCode(block, "DO")} break; default:\n${generator.statementToCode(block, "DEFAULT")}}\n`;
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
