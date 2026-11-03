export function run(code) {
  const output = [];
  const fakeConsole = {
    log: (...args) => output.push(args.map(String).join(" ")),
  };

  try {
    new Function("console", code)(fakeConsole);
    return { output, error: null };
  } catch (e) {
    return { output, error: e instanceof Error ? e.message : String(e) };
  }
}

/* eval
export function run(code) {
  const output = [];
  const console = { log: (...args) => output.push(args.map(String).join(" ")) };
  try {
    eval(code); // sees the local `console` above
    return { output, error: null };
  } catch (e) {
    return { output, error: e instanceof Error ? e.message : String(e) };
  }
}
*/
