import * as Blockly from "blockly/core";
import { javascriptGenerator, Order } from "blockly/javascript";

export function outputBlock(level, preview = true) {
  return {
    type: `level${level}_output`,
    message0: `Izpiši številko nivoja ${level}`,
    previousStatement: null,
    nextStatement: null,
    colour: 120,
    preview,
  };
}

export function inputBlock(level) {
  return {
    type: `level${level}_input`,
    message0: "Vnosno polje %1 shrani v %2",
    args0: [
      { type: "input_value", name: "LABEL", check: "String" },
      { type: "field_input", name: "NAME", text: "vnos" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  };
}

export function buttonActionBlock(level) {
  return {
    type: `level${level}_button_action`,
    message0: "Gumb %1 kopira vnos %2 v spremenljivko %3",
    args0: [
      { type: "input_value", name: "LABEL", check: "String" },
      { type: "field_input", name: "SOURCE", text: "vnos" },
      { type: "field_input", name: "TARGET", text: "vrednost" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 30,
  };
}

export function textBlock(level) {
  return {
    type: `level${level}_text`,
    message0: "Besedilo %1",
    args0: [{ type: "input_value", name: "TEXT", check: "String" }],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  };
}

export function styledTextBlock(level) {
  return {
    type: `level${level}_styled_text`,
    message0:
      "Besedilo %1 velikost %2 barva %3 teža %4 odmik %5 notranji odmik %6",
    args0: [
      { type: "input_value", name: "TEXT", check: "String" },
      { type: "input_value", name: "FONT_SIZE", check: "String" },
      { type: "input_value", name: "COLOR", check: "String" },
      { type: "input_value", name: "FONT_WEIGHT", check: "String" },
      { type: "input_value", name: "MARGIN", check: "String" },
      { type: "input_value", name: "PADDING", check: "String" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  };
}

export function variableSetBlock(level) {
  return {
    type: `level${level}_set_variable`,
    message0: "Nastavi spremenljivko %1 na %2",
    args0: [
      { type: "field_input", name: "NAME", text: "vrednost" },
      { type: "input_value", name: "VALUE", check: "String" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 330,
  };
}

export function variableGetBlock(level) {
  return {
    type: `level${level}_get_variable`,
    message0: "Vrednost spremenljivke %1",
    args0: [{ type: "field_input", name: "NAME", text: "vrednost" }],
    output: "String",
    colour: 330,
  };
}

export function ifBlock(level) {
  return {
    type: `level${level}_if`,
    message0: "če %1 naredi %2",
    args0: [
      { type: "input_value", name: "CONDITION", check: "Boolean" },
      { type: "input_statement", name: "DO" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  };
}

export function switchBlock(level) {
  return {
    type: `level${level}_switch`,
    message0: "izberi %1 primer %2 naredi %3 sicer %4",
    args0: [
      { type: "input_value", name: "VALUE" },
      { type: "input_value", name: "CASE", check: "String" },
      { type: "input_statement", name: "DO" },
      { type: "input_statement", name: "DEFAULT" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 210,
  };
}

export function repeatBlock(level) {
  return {
    type: `level${level}_repeat`,
    message0: "ponovi %1 krat %2",
    args0: [
      { type: "input_value", name: "TIMES", check: "Number" },
      { type: "input_statement", name: "DO" },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: 290,
  };
}

export function registerBlocks(definitions) {
  const blocks =
    Blockly.common.createBlockDefinitionsFromJsonArray(definitions);
  Blockly.common.defineBlocks(blocks);
  return Object.values(blocks);
}

export function registerGenerators(level, { preview = true } = {}) {
  const generators = Object.create(null);
  const outputType = `level${level}_output`;
  generators[outputType] = () =>
    preview
      ? `document.getElementById("output").textContent += "${level}\\n"; console.log("${level}");\n`
      : `console.log("${level}");\n`;

  const textType = `level${level}_text`;
  generators[textType] = (block, generator) => {
    const text = generator.valueToCode(block, "TEXT", Order.ATOMIC) || '""';
    return `const textElement${block.id} = document.createElement("p"); textElement${block.id}.textContent = ${text}; document.getElementById("output").appendChild(textElement${block.id});\n`;
  };

  const styledType = `level${level}_styled_text`;
  generators[styledType] = (block, generator) => {
    const value = (name) =>
      generator.valueToCode(block, name, Order.ATOMIC) || '""';
    return `const styledElement${block.id} = document.createElement("p"); styledElement${block.id}.textContent = ${value("TEXT")}; styledElement${block.id}.style.fontSize = ${value("FONT_SIZE")}; styledElement${block.id}.style.color = ${value("COLOR")}; styledElement${block.id}.style.fontWeight = ${value("FONT_WEIGHT")}; styledElement${block.id}.style.margin = ${value("MARGIN")}; styledElement${block.id}.style.padding = ${value("PADDING")}; document.getElementById("output").appendChild(styledElement${block.id});\n`;
  };

  const setType = `level${level}_set_variable`;
  generators[setType] = (block, generator) => {
    const name = block.getFieldValue("NAME") || "vrednost";
    const value = generator.valueToCode(block, "VALUE", Order.ATOMIC) || '""';
    return `window.level${level}Variables = window.level${level}Variables || {}; window.level${level}Variables["${name}"] = ${value};\n`;
  };

  const getType = `level${level}_get_variable`;
  generators[getType] = (block) => [
    `window.level${level}Variables["${block.getFieldValue("NAME") || "vrednost"}"]`,
    Order.ATOMIC,
  ];

  const inputType = `level${level}_input`;
  generators[inputType] = (block, generator) => {
    const label = generator.valueToCode(block, "LABEL", Order.ATOMIC) || '""';
    const name = block.getFieldValue("NAME") || "vnos";
    return `const input${block.id} = document.createElement("input"); input${block.id}.placeholder = ${label}; input${block.id}.dataset.variable = "${name}"; input${block.id}.addEventListener("input", (event) => { window.level${level}Variables["${name}"] = event.target.value; }); document.getElementById("output").appendChild(input${block.id});\n`;
  };

  const buttonType = `level${level}_button_action`;
  generators[buttonType] = (block, generator) => {
    const label =
      generator.valueToCode(block, "LABEL", Order.ATOMIC) || '"Gumb"';
    const source = block.getFieldValue("SOURCE") || "vnos";
    const target = block.getFieldValue("TARGET") || "vrednost";
    return `const button${block.id} = document.createElement("button"); button${block.id}.textContent = ${label}; button${block.id}.addEventListener("click", () => { window.level${level}Variables["${target}"] = window.level${level}Variables["${source}"] ?? ""; }); document.getElementById("output").appendChild(button${block.id});\n`;
  };

  const ifType = `level${level}_if`;
  generators[ifType] = (block, generator) => {
    const condition =
      generator.valueToCode(block, "CONDITION", Order.NONE) || "false";
    const statements = generator.statementToCode(block, "DO");
    return `if (${condition}) {\n${statements}}\n`;
  };

  const switchType = `level${level}_switch`;
  generators[switchType] = (block, generator) => {
    const value = generator.valueToCode(block, "VALUE", Order.NONE) || '""';
    const caseValue = generator.valueToCode(block, "CASE", Order.NONE) || '""';
    const statements = generator.statementToCode(block, "DO");
    const fallback = generator.statementToCode(block, "DEFAULT");
    return `switch (${value}) { case ${caseValue}:\n${statements} break; default:\n${fallback}}\n`;
  };

  const repeatType = `level${level}_repeat`;
  generators[repeatType] = (block, generator) => {
    const times = generator.valueToCode(block, "TIMES", Order.NONE) || "0";
    const statements = generator.statementToCode(block, "DO");
    return `for (let repeatIndex${block.id} = 0; repeatIndex${block.id} < ${times}; repeatIndex${block.id}++) {\n${statements}}\n`;
  };

  Object.assign(javascriptGenerator.forBlock, generators);
  return generators;
}

export function extendLevel(previous, blocks, generators, toolbox) {
  return {
    blocks: [...previous.blocks, ...blocks],
    generators: { ...previous.generators, ...generators },
    toolbox: {
      kind: "categoryToolbox",
      contents: [...previous.toolbox.contents, ...toolbox.contents],
    },
  };
}

export function mergeToolboxes(...toolboxes) {
  const categories = new Map();

  for (const toolbox of toolboxes) {
    for (const item of toolbox.contents) {
      if (item.kind !== "category") {
        continue;
      }

      const existing = categories.get(item.name);
      if (existing) {
        existing.contents = [...existing.contents, ...(item.contents ?? [])];
      } else {
        categories.set(item.name, {
          ...item,
          contents: [...(item.contents ?? [])],
        });
      }
    }
  }

  return {
    kind: "categoryToolbox",
    contents: [...categories.values()],
  };
}
