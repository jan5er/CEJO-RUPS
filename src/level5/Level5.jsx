import App from "../App";
import { tasksLevel5 } from "./tasks";
import { toolboxLevel5 } from "./toolbox";

export default function Level5() {
  return (
    <App
      levelNumber={5}
      levelTasks={tasksLevel5}
      toolbox={toolboxLevel5}
      nextLevel={6}
      showPreview
    />
  );
}
