import invariant from "ts-invariant";

import { parseTokens } from "./tokens";

export interface MoveCommand {
  type: "move";
  x: number;
  y: number;
}

export function parseMoveCommandAt(
  path: string,
  start: number
): [command: MoveCommand, length: number] {
  invariant(path[start] === "M", "Expected M at start of string");
  const [[x, y], parsedLength] = parseTokens(
    path,
    ["space", "number", "space", "number"],
    start + 1
  );
  return [
    {
      type: "move",
      x,
      y,
    },
    1 + parsedLength,
  ];
}
