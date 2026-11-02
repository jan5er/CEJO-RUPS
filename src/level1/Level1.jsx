import App from "../App";
import { TOOLBOX } from "./utils/toolbox";
import { blocksLevel1, forBlockLevel1 } from "./utils/generator";
import { tasksLevel1 } from "./tasks";

export default function Level1() {
    return (
        <App
            levelNumber={1}
            levelTasks={tasksLevel1}
            toolbox={TOOLBOX}
            blockDefinitions={blocksLevel1}
            generators={forBlockLevel1}
            nextLevel={2}
            showPreview
        />
    );
}