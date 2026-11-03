import * as Blockly from "blockly/core";

const storageKey = "mainWorkspace";

/** @param {Blockly.Workspace} workspace */
export const save = (workspace) => {
  const data = Blockly.serialization.workspaces.save(workspace);
  window.localStorage?.setItem(storageKey, JSON.stringify(data));
};

/** @param {Blockly.Workspace} workspace */
export const load = (workspace) => {
  const data = window.localStorage?.getItem(storageKey);
  if (!data) return;

  Blockly.Events.disable();
  try {
    Blockly.serialization.workspaces.load(JSON.parse(data), workspace, false);
  } catch (error) {
    workspace.clear();
    window.localStorage?.removeItem(storageKey);
    console.error(
      "Could not restore the saved workspace. Starting empty.",
      error,
    );
  } finally {
    Blockly.Events.enable();
  }
};
