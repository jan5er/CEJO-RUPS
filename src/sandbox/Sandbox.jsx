import App from "../App";
import { toolboxLevel6 } from "../level6/toolbox";

export default function Sandbox() {
  return (
    <App
      levelLabel="Sandbox"
      levelTasks={[]}
      toolbox={toolboxLevel6}
      showPreview
    />
  );
}
