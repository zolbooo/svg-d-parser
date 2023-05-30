import {
  parseTokens,
  parseDecimalAt,
  countWhitespacesAt,
} from "../src/commands/tokens";

describe("SVG tokens", () => {
  it("should parse number properly", () => {
    expect(parseDecimalAt("-1.233")).toStrictEqual({
      value: -1.233,
      length: 6,
    });
    expect(parseDecimalAt("1.2")).toStrictEqual({ value: 1.2, length: 3 });
    expect(parseDecimalAt("1.2M3.444", 4)).toStrictEqual({
      value: 3.444,
      length: 5,
    });
    expect(() => parseDecimalAt("MM")).toThrowError();
  });
  it("should count whitespaces properly", () => {
    expect(countWhitespacesAt("1.2 ")).toBe(0);
    expect(countWhitespacesAt("1.2   M", 3)).toBe(3);
  });
  it("should parse tokens properly", () => {
    expect(
      parseTokens("1.2 3.3", ["space", "number", "space", "number"], 0)
    ).toStrictEqual([[1.2, 3.3], 7]);
    expect(
      parseTokens("M1.2 3.3", ["space", "number", "space", "number"], 1)
    ).toStrictEqual([[1.2, 3.3], 7]);
  });
});

export {};
