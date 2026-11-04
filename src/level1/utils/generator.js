import * as Blockly from "blockly/core";
import { javascriptGenerator } from "blockly/javascript";
import { buttonLevel1JSON, initGenButton } from "../blocks/Button";
import { checkboxLevel1JSON, initGenCombobox } from "../blocks/Checkbox";
import { containerLevel1JSON, initGenContainer } from "../blocks/Container";
import { headingLevel1JSON, initGenHeading } from "../blocks/Heading";
import { initGenInput, inputLevel1JSON } from "../blocks/Input";
import { initGenPage, pageLevel1JSON } from "../blocks/Page";
import { initGenSelect, selectLevel1JSON } from "../blocks/Select";
import { initGenSimpleText, simpleTextLevel1JSON } from "../blocks/SimpleText";

export const blocksLevel1 = Blockly.common.createBlockDefinitionsFromJsonArray([
  pageLevel1JSON,
  headingLevel1JSON,
  inputLevel1JSON,
  simpleTextLevel1JSON,
  containerLevel1JSON,
  checkboxLevel1JSON,
  selectLevel1JSON,
  buttonLevel1JSON,
]);

//Object that saves generetors for blocks
export const forBlockLevel1 = Object.create(null);

//Set generators for blocks
initGenPage();
initGenHeading();
initGenInput();
initGenSimpleText();
initGenContainer();
initGenCombobox();
initGenSelect();
initGenButton();

//Registering all blocks and generators into Blockly
Blockly.common.defineBlocks(blocksLevel1);
Object.assign(javascriptGenerator.forBlock, forBlockLevel1);
