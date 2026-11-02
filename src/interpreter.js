const MAX_STEPS = 10_000;

export class RunError extends Error { }

export function run(json) {
    const output = [];
    const varNames = new Map((json?.variables ?? []).map((v) => [v.id, v.name]));
    const vars = new Map();
    let steps = 0;

    const tick = () => {
        if (++steps > MAX_STEPS) {
            throw new RunError("Program se izvaja predolgo. Je zanka neskončna?");
        }
    };

    const child = (b, name) => b.inputs?.[name]?.block ?? b.inputs?.[name]?.shadow ?? null;

    const value = (b, name) => {
        const c = child(b, name);
        if (!c) throw new RunError("Manjka vrednost v bloku »" + b.type + "«.");
        return evalValue(c);
    };

    const varName = (b) => varNames.get(b.fields.VAR.id) ?? "?";

    const VALUES = {
        math_number: (b) => Number(b.fields.NUM),
        text: (b) => b.fields.TEXT,
        logic_boolean: (b) => b.fields.BOOL === "TRUE",
        variables_get: (b) => {
            const n = varName(b);
            if (!vars.has(n)) throw new RunError("Spremenljivka »" + n + "« še nima vrednosti.");
            return vars.get(n);
        },
        text_join: (b) => {
            const count = b.extraState?.itemCount ?? 2;
            let s = "";
            for (let i = 0; i < count; i++) {
                const c = child(b, "ADD" + i);
                if (c) s += String(evalValue(c));
            }
            return s;
        },
        math_arithmetic: (b) => {
            const a = value(b, "A");
            const c = value(b, "B");
            switch (b.fields.OP) {
                case "ADD": return a + c;
                case "MINUS": return a - c;
                case "MULTIPLY": return a * c;
                case "DIVIDE":
                    if (c === 0) throw new RunError("Deljenje z nič ni mogoče.");
                    return a / c;
                case "POWER": return a ** c;
                default: throw new RunError("Neznana operacija.");
            }
        },
        logic_compare: (b) => {
            const a = value(b, "A");
            const c = value(b, "B");
            switch (b.fields.OP) {
                case "EQ": return a === c;
                case "NEQ": return a !== c;
                case "LT": return a < c;
                case "LTE": return a <= c;
                case "GT": return a > c;
                case "GTE": return a >= c;
                default: throw new RunError("Neznana primerjava.");
            }
        },
    };

    const STATEMENTS = {
        text_print: (b) => { output.push(String(value(b, "TEXT"))); },
        variables_set: (b) => { vars.set(varName(b), value(b, "VALUE")); },
        controls_repeat_ext: (b) => {
            const n = value(b, "TIMES");
            for (let i = 0; i < n; i++) { tick(); runStack(child(b, "DO")); }
        },
        controls_whileUntil: (b) => {
            const until = b.fields.MODE === "UNTIL";
            while (until ? !value(b, "BOOL") : value(b, "BOOL")) {
                tick();
                runStack(child(b, "DO"));
            }
        },
        controls_if: (b) => {
            const branches = (b.extraState?.elseIfCount ?? 0) + 1;
            for (let i = 0; i < branches; i++) {
                if (value(b, "IF" + i)) { runStack(child(b, "DO" + i)); return; }
            }
            if (b.extraState?.hasElse) runStack(child(b, "ELSE"));
        },
        math_change: (b) => {
            const n = varName(b);
            if (!vars.has(n)) {
                throw new RunError("Spremenljivka »" + n + "« še nima vrednosti. Najprej jo nastavi.");
            }
            const current = vars.get(n);
            if (typeof current !== "number") {
                throw new RunError("Spremenljivka »" + n + "« ni število, zato je ne morem povečati.");
            }
            vars.set(n, current + value(b, "DELTA"));
        },
    };

    function evalValue(b) {
        tick();
        const fn = VALUES[b.type];
        if (!fn) throw new RunError("Blok »" + b.type + "« še ni podprt.");
        return fn(b);
    }

    function runStack(b) {
        for (let cur = b; cur; cur = cur.next?.block) {
            tick();
            const fn = STATEMENTS[cur.type];
            if (!fn) throw new RunError("Blok »" + cur.type + "« še ni podprt.");
            fn(cur);
        }
    }

    try {
        const tops = (json?.blocks?.blocks ?? [])
            .filter((b) => b.type in STATEMENTS) // Bloki vrednosti ki niso povezani s programom se ignorirajo
            .sort((a, b) => (a.y ?? 0) - (b.y ?? 0) || (a.x ?? 0) - (b.x ?? 0));
        for (const b of tops) runStack(b);
        return { output, error: null };
    } catch (e) {
        if (e instanceof RunError) return { output, error: e.message };
        throw e; // sDejanski bugi naj ostanejo vidni
    }
}