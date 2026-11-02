import * as Blockly from "blockly/core";
import "blockly/blocks";
import { javascriptGenerator } from "blockly/javascript";
import * as Sl from "blockly/msg/sl";
import { useEffect, useRef } from "react";
import { WORKSPACE_OPTIONS, themeFor } from "../BlocklyTheme";

//import { blocks } from "../blocks.js";
//import { forBlock } from "../generator";
import { load, save } from "../serialization";



Blockly.setLocale(Sl); // Nastavimo jezik blokov/teksta na slovenščino

Blockly.Msg.MATH_CHANGE_TITLE = "povečaj %1 za %2"; // Slovenščina to prevede v "spremni" kar je neumno in neintuitivno
Blockly.Msg.VARIABLES_SET = "nastavi %1 na %2";

/**
 * @param {object} props
 * @param {object} props.toolbox  Toolbox JSON (definiraj izven komponente!)
 * @param {object} [props.initialJson]  Naloži se samo ob zagonu
 * @param {(json: object) => void} [props.onJsonChange]
 * @param {(code: string) => void} [props.onCodeChange]  Generirana JS (samo prikaz)
 * @param {(ws: Blockly.WorkspaceSvg) => void} [props.onWorkspaceChange]
 * @param {string} [props.className]
 */
export function BlockEditor({ toolbox, initialJson, onJsonChange, onCodeChange, onWorkspaceChange, className }) {
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
        });

        if (initialRef.current) Blockly.serialization.workspaces.load(initialRef.current, ws);

        const emit = () => {
            cb.current.onWorkspaceChange?.(ws);
            cb.current.onCodeChange?.(javascriptGenerator.workspaceToCode(ws));
            cb.current.onJsonChange?.(Blockly.serialization.workspaces.save(ws));
        };

        load(ws); // namesto initialJson

        ws.addChangeListener((e) => {
            if (e.isUiEvent) return;
            save(ws);
            emit();
        });

        const onScheme = (e) => ws.setTheme(themeFor(e.matches));
        scheme.addEventListener("change", onScheme);

        const ro = new ResizeObserver(() => Blockly.svgResize(ws));
        ro.observe(containerRef.current);

        emit();

        return () => {
            scheme.removeEventListener("change", onScheme);
            ro.disconnect();
            ws.dispose();
        };
    }, [toolbox]);

    return <div ref={containerRef} className={className} />;
}