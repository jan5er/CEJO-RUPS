export const TOOLBOX = {
    kind: "categoryToolbox",
    contents: [
        {
            kind: "category",
            name: "Izpis",
            colour: "#2fb344",
            contents: [
                {
                    kind: "block",
                    type: "text_print",
                    inputs: { TEXT: { shadow: { type: "text", fields: { TEXT: "Živjo svet" } } } },
                },
                { kind: "block", type: "text" },
                { kind: "block", type: "text_join" },
            ],
        },
        {
            kind: "category",
            name: "Števila",
            colour: "#4c8dff",
            contents: [
                { kind: "block", type: "math_number" },
                { kind: "block", type: "math_arithmetic" },
            ],
        },
        {
            kind: "category",
            name: "Logika",
            colour: "#ffab19",
            contents: [
                { kind: "block", type: "controls_if" },
                { kind: "block", type: "logic_compare" },
                { kind: "block", type: "logic_boolean" },
            ],
        },
        {
            kind: "category",
            name: "Zanke",
            colour: "#ff5d7a",
            contents: [
                {
                    kind: "block",
                    type: "controls_repeat_ext",
                    inputs: { TIMES: { shadow: { type: "math_number", fields: { NUM: 3 } } } },
                },
                { kind: "block", type: "controls_whileUntil" },
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
            name: "Uporabnik",
            colour: "#8957c5",
            contents: [
                { kind: "block", type: "ask_user" }
            ]
        },

    ],
};