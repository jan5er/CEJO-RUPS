import { describe, expect, it } from "vitest";
import { run } from "./interpreter";

describe("run", () => {
  it("prints text", () => {
    expect(run("console.log('Živjo');")).toEqual({
      output: ["Živjo"],
      error: null,
    });
  });

  it("runs a loop", () => {
    expect(
      run("for (var i = 0; i < 3; i++) { console.log(i); }").output,
    ).toEqual(["0", "1", "2"]);
  });

  it("reports errors", () => {
    expect(run("console.log(").error).toBeTruthy();
    expect(run("console.log(nope);").error).toMatch(/nope/);
  });
});
