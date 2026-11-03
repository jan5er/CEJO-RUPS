import App from "../App";
import { blocksLevel4, forBlockLevel4, toolboxLevel4 } from "../levels/level4";
import { tasksLevel4 } from "./tasks";

export default function Level4() {
  return (
    <App
      levelNumber={4}
      levelTasks={tasksLevel4}
      toolbox={toolboxLevel4}
      blockDefinitions={blocksLevel4}
      generators={forBlockLevel4}
      nextLevel={5}
      showPreview
    />
  );
}
