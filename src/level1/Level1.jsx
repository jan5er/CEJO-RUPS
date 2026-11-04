import App from "../App";
import { tasksLevel1 } from "./tasks";
import { toolboxLevel1 } from "./toolbox";

export default function Level1() {
  return (
    <App
      levelNumber={1}
      levelTasks={tasksLevel1}
      toolbox={toolboxLevel1}
      nextLevel={2}
      showPreview
      rootBlockType="page_level1"
    />
  );
}
