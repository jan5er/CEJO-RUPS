import App from "../App";
import { tasksLevel4 } from "./tasks";
import { toolboxLevel4 } from "./toolbox";

export default function Level4() {
  return (
    <App
      levelNumber={4}
      levelTasks={tasksLevel4}
      toolbox={toolboxLevel4}
      nextLevel={5}
      showPreview
    />
  );
}
