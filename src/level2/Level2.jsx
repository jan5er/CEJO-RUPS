import App from "../App";
import { blocks as blocksLevel2 } from "../blocks";
import { forBlock as forBlockLevel2 } from "../generator";
import { TOOLBOX as toolboxLevel2 } from "../toolbox";
import { tasksLevel2 } from "./tasks";

export default function Level2() {
  return (
    <App
      levelNumber={2}
      levelTasks={tasksLevel2}
      toolbox={toolboxLevel2}
      blockDefinitions={blocksLevel2}
      generators={forBlockLevel2}
      showPreview
    />
  );
}
