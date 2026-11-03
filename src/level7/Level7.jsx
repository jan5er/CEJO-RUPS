import App from "../App";
import { blocksLevel7, forBlockLevel7, toolboxLevel7 } from "../levels/level7";
import { tasksLevel7 } from "./tasks";

export default function Level7() {
  return (
    <App
      levelNumber={7}
      levelTasks={tasksLevel7}
      toolbox={toolboxLevel7}
      blockDefinitions={blocksLevel7}
      generators={forBlockLevel7}
      showPreview={false}
    />
  );
}
