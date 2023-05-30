import { parseCubicCurveAt } from "../src/commands/curve";

describe("Curve command parser", () => {
  it("should parse cubic bezier curves properly", () => {
    expect(parseCubicCurveAt("C1.2 3.3 4.4 5.5 6.6 7.7", 0)).toStrictEqual([
      {
        type: "cubicBezier",
        control1X: 1.2,
        control1Y: 3.3,
        control2X: 4.4,
        control2Y: 5.5,
        targetX: 6.6,
        targetY: 7.7,
      },
      24,
    ]);
  });
});

export {};
