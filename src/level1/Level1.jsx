import { TOOLBOX } from "./utils/toolbox";
import { blocksLevel1, forBlockLevel1 } from "./utils/generator";
import { HTMLBlockEditor } from "../components/HTMLBlockEditor";

export default function Level1(){
    return (<>
        <HTMLBlockEditor toolbox={TOOLBOX} blocks={blocksLevel1} forBlock={forBlockLevel1}/>
    </>);
    
}