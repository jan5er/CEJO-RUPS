import App from "../App";
import { blocksLevel2, forBlockLevel2 } from "./utils/generator";
import { TOOLBOX as toolboxLevel2 } from "./utils/toolbox";
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
