import App from "../App";
import { blocksLevel6, forBlockLevel6, toolboxLevel6 } from "../levels/level6";
import { tasksLevel6 } from "./tasks";

export default function Level6() {
  return (
    <App
      levelNumber={6}
      levelTasks={tasksLevel6}
      toolbox={toolboxLevel6}
      blockDefinitions={blocksLevel6}
      generators={forBlockLevel6}
      completionMessage="Čestitke, zaključil si osnove programiranja!"
      showPreview
    />
  );
}
