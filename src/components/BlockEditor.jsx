import * as Blockly from "blockly/core";
import "blockly/blocks";
import { javascriptGenerator } from "blockly/javascript";
import * as Sl from "blockly/msg/sl";
import { useEffect, useRef } from "react";
import { themeFor, WORKSPACE_OPTIONS } from "../BlocklyTheme";
import "../custom-blocks";
import { load, save } from "../serialization";

Blockly.setLocale(Sl); // Nastavimo jezik blokov/teksta na slovenščino

Blockly.Msg.MATH_CHANGE_TITLE = "povečaj %1 za %2"; // Slovenščina to prevede v "spremni" kar je neumno in neintuitivno
Blockly.Msg.VARIABLES_SET = "nastavi %1 na %2";

const ORPHANED = "ORPHANED_BLOCK";

/**
 * @param {Blockly.WorkspaceSvg} ws
 * @param {string} type
 */
function setupRootBlock(ws, type) {
  Blockly.Events.disable();
  try {
    const root =
      ws.getBlocksByType(type, false)[0]
      ?? Blockly.serialization.blocks.append({ type, x: 40, y: 40 }, ws);
    root.setDeletable(false);

    for (const block of ws.getTopBlocks(false)) {
      if (!block.outputConnection && !block.previousConnection) continue;
      for (let b = block; b; b = b.getNextBlock()) {
        b.setDisabledReason(true, ORPHANED);
      }
    }
  } finally {
    Blockly.Events.enable();
  }
  ws.addChangeListener(Blockly.Events.disableOrphans);
}

/**
 * @param {object} props
 * @param {object} props.toolbox  Toolbox JSON (definiraj izven komponente!)
 * @param {object} [props.initialJson]  Naloži se samo ob zagonu
 * @param {(json: object) => void} [props.onJsonChange]
 * @param {(code: string) => void} [props.onCodeChange]  Generirana JS (samo prikaz)
 * @param {(ws: Blockly.WorkspaceSvg) => void} [props.onWorkspaceChange]
 * @param {string} props.storageKey  Ključ v localStorage; ob spremembi se naloži drugo platno
 * @param {string} [props.fallbackStorageKey]  Naloži se, če pod storageKey še ni ničesar
 * @param {string} [props.rootBlockType]  Korenski blok (npr. Stran); izvedejo se samo bloki pripeti nanj
 * @param {string} [props.className]
 */
export function BlockEditor({
  toolbox,
  initialJson,
  onJsonChange,
  onCodeChange,
  onWorkspaceChange,
  storageKey,
  fallbackStorageKey,
  rootBlockType,
  className,
}) {
  const containerRef = useRef(null);
  const cb = useRef({});
  cb.current = { onJsonChange, onCodeChange, onWorkspaceChange };
  const initialRef = useRef(initialJson);

  useEffect(() => {
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const ws = Blockly.inject(containerRef.current, {
      ...WORKSPACE_OPTIONS,
      theme: themeFor(scheme.matches),
      toolbox,
      ...(rootBlockType && { maxInstances: { [rootBlockType]: 1 } }),
    });

    if (initialRef.current)
      Blockly.serialization.workspaces.load(initialRef.current, ws);

    const emit = () => {
      cb.current.onWorkspaceChange?.(ws);
      cb.current.onCodeChange?.(javascriptGenerator.workspaceToCode(ws));
      cb.current.onJsonChange?.(Blockly.serialization.workspaces.save(ws));
    };

    if (!load(ws, storageKey) && fallbackStorageKey)
      load(ws, fallbackStorageKey);
    if (rootBlockType) setupRootBlock(ws, rootBlockType);
    save(ws, storageKey);

    const onChange = (e) => {
      if (e.isUiEvent) return;
      save(ws, storageKey);
      emit();
    };
    ws.addChangeListener(onChange);

    const onScheme = (e) => ws.setTheme(themeFor(e.matches));
    scheme.addEventListener("change", onScheme);

    const ro = new ResizeObserver(() => Blockly.svgResize(ws));
    ro.observe(containerRef.current);

    emit();

    return () => {
      scheme.removeEventListener("change", onScheme);
      ro.disconnect();
      // dispose calls onChange which calls save, therefore we need to remove onChange so we aren't
      // saving an empty canvas
      ws.removeChangeListener(onChange);
      ws.dispose();
    };
  }, [toolbox, rootBlockType, storageKey, fallbackStorageKey]);

  return <div ref={containerRef} className={className} />;
}
