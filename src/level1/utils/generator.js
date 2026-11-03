import * as Blockly from 'blockly/core'; 
import { headingLevel1JSON, initGenHeading } from "../blocks/Heading";
import { inputLevel1JSON, initGenInput } from "../blocks/Input";
import { simpleTextLevel1JSON, initGenSimpleText } from "../blocks/SimpleText";
import { containerLevel1JSON, initGenContainer } from "../blocks/Container";
import { checkboxLevel1JSON, initGenCombobox } from "../blocks/Checkbox";
import { selectLevel1JSON, initGenSelect } from "../blocks/Select";
import { buttonLevel1JSON, initGenButton } from "../blocks/Button";
import { javascriptGenerator } from "blockly/javascript";

export const blocksLevel1 = Blockly.common.createBlockDefinitionsFromJsonArray([
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
