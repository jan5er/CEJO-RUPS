import App from "../App";
import { blocksLevel6, forBlockLevel6, toolboxLevel6 } from "../levels/level6";

/** Peskovnik: vsi bloki, brez nalog – za prosto igranje in preizkušanje. */
export default function Sandbox() {
  return (
    <App
      levelLabel="Sandbox"
      levelTasks={[]}
      toolbox={toolboxLevel6}
      blockDefinitions={blocksLevel6}
      generators={forBlockLevel6}
      showPreview
    />
  );
}
