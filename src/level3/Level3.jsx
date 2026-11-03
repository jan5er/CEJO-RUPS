import App from "../App";
import { blocksLevel3, forBlockLevel3, toolboxLevel3 } from "../levels/level3";
import { tasksLevel3 } from "./tasks";

export default function Level3() {
  return (
    <App
      levelNumber={3}
      levelTasks={tasksLevel3}
      toolbox={toolboxLevel3}
      blockDefinitions={blocksLevel3}
      generators={forBlockLevel3}
      nextLevel={4}
      showPreview
    />
  );
}
