import { parseMoveCommandAt } from "../src/commands/move";

describe("Move command parser", () => {
  it("should parse move command properly", () => {
    expect(parseMoveCommandAt("M1.2 2.3", 0)).toStrictEqual([
      { type: "move", x: 1.2, y: 2.3 },
      8,
    ]);
    expect(parseMoveCommandAt("M 1.2 2.3", 0)).toStrictEqual([
      { type: "move", x: 1.2, y: 2.3 },
      9,
    ]);
  });
});

export {};
