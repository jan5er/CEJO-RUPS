import { describe, expect, it } from "vitest";
import { run } from "./interpreter";

const wrap = (...blocks) => ({ blocks: { blocks }, variables: [{ id: "v1", name: "x" }] });
const num = (n) => ({ block: { type: "math_number", fields: { NUM: n } } });
const print = (valueInput, next) => ({
    type: "text_print",
    inputs: { TEXT: valueInput },
    ...(next && { next: { block: next } }),
});

describe("interpreter", () => {
    it("prints text", () => {
        const json = wrap(print({ block: { type: "text", fields: { TEXT: "Živjo svet" } } }));
        expect(run(json)).toEqual({ output: ["Živjo svet"], error: null });
    });

    it("repeats", () => {
        const body = print({ block: { type: "text", fields: { TEXT: "Hej" } } });
        const json = wrap({
            type: "controls_repeat_ext",
            inputs: { TIMES: num(3), DO: { block: body } },
        });
        expect(run(json).output).toEqual(["Hej", "Hej", "Hej"]);
    });

    it("stops infinite loops", () => {
        const json = wrap({
            type: "controls_whileUntil",
            fields: { MODE: "WHILE" },
            inputs: { BOOL: { block: { type: "logic_boolean", fields: { BOOL: "TRUE" } } } },
        });
        expect(run(json).error).toMatch(/predolgo/);
    });

    it("reports unset variables", () => {
        const json = wrap(print({ block: { type: "variables_get", fields: { VAR: { id: "v1" } } } }));
        expect(run(json).error).toMatch(/»x«/);
    });
});