export const toolboxLevel1 = {
  kind: "categoryToolbox",
  contents: [
    {
      kind: "category",
      name: "Izpis",
      colour: "#2fb344",
      contents: [{ kind: "block", type: "text" }],
    },
    {
      kind: "category",
      name: "Števila",
      colour: "#4c8dff",
      contents: [{ kind: "block", type: "math_number" }],
    },
    {
      kind: "category",
      name: "Seznami",
      colour: "#745ba5",
      contents: [{ kind: "block", type: "lists_create_with" }],
    },
    {
      kind: "category",
      name: "Elementi",
      colour: "#da7d12",
      contents: [
        { kind: "block", type: "container_level1" },
        { kind: "block", type: "heading_level1" },
        { kind: "block", type: "text_simple_level1" },
        { kind: "block", type: "input_level1" },
        { kind: "block", type: "checkbox_level1" },
        { kind: "block", type: "select_level1" },
        { kind: "block", type: "button_level1" },
      ],
    },
  ],
};
