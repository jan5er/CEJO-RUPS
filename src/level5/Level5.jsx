import App from "../App";
import { blocksLevel5, forBlockLevel5, toolboxLevel5 } from "../levels/level5";
import { tasksLevel5 } from "./tasks";

export default function Level5() {
  return (
    <App
      levelNumber={5}
      levelTasks={tasksLevel5}
      toolbox={toolboxLevel5}
      blockDefinitions={blocksLevel5}
      generators={forBlockLevel5}
      nextLevel={6}
      showPreview
    />
  );
}
