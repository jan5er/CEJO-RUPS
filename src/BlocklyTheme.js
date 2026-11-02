import * as Blockly from "blockly/core";

const block = (p, s, t) => ({ colourPrimary: p, colourSecondary: s, colourTertiary: t });

// Barve blokov: iste kot barve kategorij v toolbox.js
const blockStyles = {
    text_blocks: block("#2fb344", "#26913a", "#1f7a31"),
    math_blocks: block("#4c8dff", "#3a73d6", "#2f60b8"),
    logic_blocks: block("#ffab19", "#d98f0f", "#b87800"),
    loop_blocks: block("#ff5d7a", "#d94a65", "#b83c55"),
    variable_blocks: block("#ff8a3d", "#d9722e", "#b86024"),
    variable_dynamic_blocks: block("#ff8a3d", "#d9722e", "#b86024"),
};

const font = { family: 'system-ui, "Segoe UI", sans-serif', weight: "700", size: 12 };

const light = Blockly.Theme.defineTheme("blokko-light", {
    name: "blokko-light",
    base: Blockly.Themes.Classic,
    blockStyles,
    fontStyle: font,
    componentStyles: {
        workspaceBackgroundColour: "#eef2ff",
        toolboxBackgroundColour: "#ffffff",
        toolboxForegroundColour: "#1b2333",
        flyoutBackgroundColour: "#e3e9fb",
        flyoutForegroundColour: "#1b2333",
        flyoutOpacity: 1,
        scrollbarColour: "#8fa2e6",
        scrollbarOpacity: 0.6,
        insertionMarkerColour: "#4c6ef5",
        insertionMarkerOpacity: 0.35,
        markerColour: "#4c6ef5",
        cursorColour: "#4c6ef5",
    },
});

const dark = Blockly.Theme.defineTheme("blokko-dark", {
    name: "blokko-dark",
    base: Blockly.Themes.Classic,
    blockStyles,
    fontStyle: font,
    componentStyles: {
        workspaceBackgroundColour: "#151a28",
        toolboxBackgroundColour: "#1c2231",
        toolboxForegroundColour: "#e8ebf3",
        flyoutBackgroundColour: "#222a3c",
        flyoutForegroundColour: "#e8ebf3",
        flyoutOpacity: 1,
        scrollbarColour: "#5a6ba8",
        scrollbarOpacity: 0.7,
        insertionMarkerColour: "#8fa2ff",
        insertionMarkerOpacity: 0.4,
        markerColour: "#8fa2ff",
        cursorColour: "#8fa2ff",
    },
});

export const themeFor = (isDark) => (isDark ? dark : light);

export const WORKSPACE_OPTIONS = {
    renderer: "zelos", // Renderer z bolj zaobljenimi robovi, ki je lepši na zaslonih visoke ločljivosti
    sounds: false,
    trashcan: true,
    scrollbars: true,
    grid: { spacing: 26, length: 3, colour: "#9aa9de", snap: true },
    zoom: { controls: true, wheel: true, startScale: 1.1, minScale: 0.5, maxScale: 2 },
};