import * as Blockly from "blockly/core";

/**
 * @param {Blockly.Workspace} workspace
 * @param {string} storageKey
 */
export const save = (workspace, storageKey) => {
  const data = Blockly.serialization.workspaces.save(workspace);
  window.localStorage?.setItem(storageKey, JSON.stringify(data));
};

/**
 * @param {Blockly.Workspace} workspace
 * @param {string} storageKey
 * @returns {boolean}
 */
export const load = (workspace, storageKey) => {
  const data = window.localStorage?.getItem(storageKey);
  if (!data) return false;

  Blockly.Events.disable();
  try {
    Blockly.serialization.workspaces.load(JSON.parse(data), workspace, false);
    return true;
  } catch (error) {
    workspace.clear();
    window.localStorage?.removeItem(storageKey);
    console.error(
      "Could not restore the saved workspace. Starting empty.",
      error,
    );
    return false;
  } finally {
    Blockly.Events.enable();
  }
};
