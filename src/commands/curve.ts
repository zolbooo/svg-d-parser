import invariant from "ts-invariant";

import { parseTokens } from "./tokens";

export interface QuadBezierCommand {
  type: "quadBezier";
  controlX: number;
  controlY: number;
  targetX: number;
  targetY: number;
}

export interface CubicBezierCommand {
  type: "cubicBezier";
  control1X: number;
  control1Y: number;
  control2X: number;
  control2Y: number;
  targetX: number;
  targetY: number;
}

export function parseQuadCurveAt(
  path: string,
  start: number
): [command: QuadBezierCommand, length: number] {
  invariant(path[start] === "Q", "Expected Q at start of string");
  const [[controlX, controlY, targetX, targetY], parsedLength] = parseTokens(
    path,
    [
      "space",
      "number",
      "space",
      "number",
      "space",
      "number",
      "space",
      "number",
    ],
    start + 1
  );
  return [
    {
      type: "quadBezier",
      controlX,
      controlY,
      targetX,
      targetY,
    },
    1 + parsedLength,
  ];
}

export function parseCubicCurveAt(
  path: string,
  start: number
): [command: CubicBezierCommand, length: number] {
  const command = path[start];
  invariant(command === "C", "Expected C or c at start of string");
  const [[c1x, c1y, c2x, c2y, x, y], parsedLength] = parseTokens(
    path,
    [
      "space",
      "number",
      "space",
      "number",
      "space",
      "number",
      "space",
      "number",
      "space",
      "number",
      "space",
      "number",
    ],
    start + 1
  );
  return [
    {
      type: "cubicBezier",
      control1X: c1x,
      control1Y: c1y,
      control2X: c2x,
      control2Y: c2y,
      targetX: x,
      targetY: y,
    },
    1 + parsedLength,
  ];
}
