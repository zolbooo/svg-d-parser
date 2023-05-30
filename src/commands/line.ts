import invariant from "ts-invariant";

import { SvgCommand } from "./index";
import { parseTokens } from "./tokens";

export interface LineCommand {
  type: "line";
  x: number;
  y: number;
}
export interface RelativeLineCommand {
  type: "relLine";
  dx: number;
  dy: number;
}

export function parseLineCommandAt(
  path: string,
  start: number
): [command: LineCommand | RelativeLineCommand, length: number] {
  const command = path[start];
  invariant(
    command === "L" || command === "l",
    "Expected L or l at start of string"
  );
  const [[x, y], parsedLength] = parseTokens(
    path,
    ["space", "number", "space", "number"],
    start + 1
  );
  return [
    command === "L"
      ? {
          type: "line",
          x,
          y,
        }
      : { type: "relLine", dx: x, dy: y },
    1 + parsedLength,
  ];
}

export function parseHorizontalLineCommandAt(
  path: string,
  start: number,
  context: SvgCommand | undefined
): [command: LineCommand, length: number] {
  const command = path[start];
  invariant(
    command === "H" || command === "h",
    "Expected H or h at start of string"
  );

  invariant(
    context && (context.type === "move" || context.type === "line"),
    "Currently only move or line commands before H/h are supported. Please raise an issue."
  );

  const [[x], parsedLength] = parseTokens(path, ["number", "space"], start + 1);
  return [
    command === "H"
      ? {
          type: "line",
          x,
          y: context.y,
        }
      : { type: "line", x: context.x + x, y: context.y },
    1 + parsedLength,
  ];
}

export function parseVerticalLineCommandAt(
  path: string,
  start: number,
  context?: SvgCommand | undefined
): [command: LineCommand, length: number] {
  const command = path[start];
  invariant(
    command === "V" || command === "v",
    "Expected V or v at start of string"
  );

  invariant(
    context && (context.type === "move" || context.type === "line"),
    "Currently only move or line commands before V/v are supported. Please raise an issue."
  );

  const [[y], parsedLength] = parseTokens(path, ["number", "space"], start + 1);
  return [
    command === "V"
      ? {
          type: "line",
          x: context.x,
          y: y,
        }
      : { type: "line", x: context.x, y: context.y + y },
    1 + parsedLength,
  ];
}
