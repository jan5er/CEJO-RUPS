export const TOOLBOX = {
    kind: "categoryToolbox",
    contents: [
        {
            kind: "category",
            name: "Izpis",
            colour: "#2fb344",
            contents: [
                { kind: "block", type: "text" },
            ],
        },
        {
            kind: "category",
            name: "Števila",
            colour: "#4c8dff",
            contents: [
                { kind: "block", type: "math_number" },
            ],
        },
        {
            kind: "category",
            name: "Spremenljivke",
            colour: "#ff8a3d",
            custom: "VARIABLE"
        },
        {
            kind: "category",
            name: "Elementi",
            colour: "#19ff71",
            contents: [
                { kind: "block", type: "container_level1" },
                { kind: "block", type: "heading_level1" },
                { kind: "block", type: "text_simple_level1" },
                { kind: "block", type: "input_level1" },
                { kind: "block", type: "checkbox_level1" },
                { kind: "block", type: "select_level1" },
            ],
        },

    ],
};