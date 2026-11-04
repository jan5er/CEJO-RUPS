// Vsi lastni bloki so registrirani globalno; kateri so na voljo na posameznem levelu, določa njegov toolbox.
import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import { askUser } from "./AskUser";
import { button } from "./Button";
import { checkbox } from "./Checkbox";
import { color } from "./Color";
import { consoleOutput } from "./ConsoleOutput";
import { container } from "./Container";
import { cssStyle } from "./CssStyle";
import { heading } from "./Heading";
import { htmlElement } from "./HtmlElement";
import { ifStatement } from "./If";
import { input } from "./Input";
import { page } from "./Page";
import { repeatLoop } from "./Repeat";
import { select } from "./Select";
import { simpleText } from "./SimpleText";
import { switchStatement } from "./Switch";
import { variableGet, variableSet } from "./Variables";

const CUSTOM_BLOCKS = [
  page,
  container,
  heading,
  simpleText,
  input,
  checkbox,
  select,
  button,
  htmlElement,
  cssStyle,
  color,
  variableSet,
  variableGet,
  ifStatement,
  switchStatement,
  repeatLoop,
  consoleOutput,
  askUser,
];

Blockly.common.defineBlocksWithJsonArray(
  CUSTOM_BLOCKS.map(({ definition }) => definition),
);
for (const { definition, generator } of CUSTOM_BLOCKS) {
  javascriptGenerator.forBlock[definition.type] = generator;
}
