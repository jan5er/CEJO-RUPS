import * as Blockly from 'blockly/core'; 
import { headingLevel1JSON, initGenHeading } from "./Heading";
import { inputLevel1JSON, initGenInput } from "./Input";
import { simpleTextLevel1JSON, initGenSimpleText } from "./SimpleText";

export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
    headingLevel1JSON,
    inputLevel1JSON,
    simpleTextLevel1JSON,
]);

//Object that saves generetors for blocks
export const forBlock = Object.create(null);

//Set generators for blocks
initGenHeading();
initGenInput();
initGenSimpleText();
