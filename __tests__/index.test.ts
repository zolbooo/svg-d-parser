import { parsePath } from "../src";
import { SvgCommand } from "../src/commands";

describe("SVG parser", () => {
  it("should parse paths properly", () => {
    expect<SvgCommand[]>(
      parsePath(
        "M6.99967 123.5C1.99967 130.5 -0.500244 139 2.99971 143.5C6.49967 148 23.9998 156 50.4998 128"
      )
    ).toStrictEqual([
      { type: "move", x: 6.99967, y: 123.5 },
      {
        type: "cubicBezier",
        control1X: 1.99967,
        control1Y: 130.5,
        control2X: -0.500244,
        control2Y: 139,
        targetX: 2.99971,
        targetY: 143.5,
      },
      {
        type: "cubicBezier",
        control1X: 6.49967,
        control1Y: 148,
        control2X: 23.9998,
        control2Y: 156,
        targetX: 50.4998,
        targetY: 128,
      },
    ]);
  });

  it("should parse H and V commands properly", () => {
    expect<SvgCommand[]>(parsePath("M1.93018 1.03125H65.5902V0")).toStrictEqual(
      [
        { type: "move", x: 1.93018, y: 1.03125 },
        {
          type: "line",
          x: 65.5902,
          y: 1.03125,
        },
        {
          type: "line",
          x: 65.5902,
          y: 0,
        },
      ]
    );
  });

  it("should parse Z commands properly", () => {
    expect<SvgCommand[]>(
      parsePath("M1.93018 1.03125H65.5902V0Z")
    ).toStrictEqual([
      { type: "move", x: 1.93018, y: 1.03125 },
      {
        type: "line",
        x: 65.5902,
        y: 1.03125,
      },
      {
        type: "line",
        x: 65.5902,
        y: 0,
      },
      { type: "line", x: 1.93018, y: 1.03125 },
    ]);
  });

  it("should parse merged paths with multiple Z commands", () => {
    expect<SvgCommand[]>(
      parsePath(
        "M1.93018 1.03125V0Z M6.99967 123.5C1.99967 130.5 -0.500244 139 2.99971 143.5Z"
      )
    ).toStrictEqual([
      { type: "move", x: 1.93018, y: 1.03125 },
      {
        type: "line",
        x: 1.93018,
        y: 0,
      },
      { type: "line", x: 1.93018, y: 1.03125 },
      { type: "move", x: 6.99967, y: 123.5 },
      {
        type: "cubicBezier",
        control1X: 1.99967,
        control1Y: 130.5,
        control2X: -0.500244,
        control2Y: 139,
        targetX: 2.99971,
        targetY: 143.5,
      },
      { type: "line", x: 6.99967, y: 123.5 },
    ]);
  });
});
