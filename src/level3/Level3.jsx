import App from "../App";
import { tasksLevel3 } from "./tasks";
import { toolboxLevel3 } from "./toolbox";

export default function Level3() {
  return (
    <App
      levelNumber={3}
      levelTasks={tasksLevel3}
      toolbox={toolboxLevel3}
      nextLevel={4}
      showPreview
    />
  );
}
