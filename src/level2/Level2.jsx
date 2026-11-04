import App from "../App";
import { tasksLevel2 } from "./tasks";
import { toolboxLevel2 } from "./toolbox";

export default function Level2() {
  return (
    <App
      levelNumber={2}
      levelTasks={tasksLevel2}
      toolbox={toolboxLevel2}
      nextLevel={3}
      showPreview
    />
  );
}
