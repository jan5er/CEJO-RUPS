import App from "../App";
import { tasksLevel6 } from "./tasks";
import { toolboxLevel6 } from "./toolbox";

export default function Level6() {
  return (
    <App
      levelNumber={6}
      levelTasks={tasksLevel6}
      toolbox={toolboxLevel6}
      completionMessage="Čestitke, zaključil si osnove programiranja!"
      showPreview
    />
  );
}
