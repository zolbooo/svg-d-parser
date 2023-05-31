import invariant from "ts-invariant";

import {
  SvgCommand,
  parseQuadCurveAt,
  parseCubicCurveAt,
  parseLineCommandAt,
  parseMoveCommandAt,
  countWhitespacesAt,
  parseVerticalLineCommandAt,
  parseHorizontalLineCommandAt,
} from "./commands";

export * from "./commands";
export * from "./compose";

export function parsePath(path: string): SvgCommand[] {
  const result: SvgCommand[] = [];
  let current = 0;

  let startingCommand: SvgCommand | null = null;
  let shouldUpdateStartingCommand = true;

  let command: SvgCommand;
  let length: number;
  while (current < path.length) {
    switch (path[current]) {
      case "M":
        [command, length] = parseMoveCommandAt(path, current);
        break;
      case "L":
      case "l":
        [command, length] = parseLineCommandAt(path, current);
        break;
      case "H":
      case "h":
        [command, length] = parseHorizontalLineCommandAt(
          path,
          current,
          result[result.length - 1]
        );
        break;
      case "V":
      case "v":
        [command, length] = parseVerticalLineCommandAt(
          path,
          current,
          result[result.length - 1]
        );
        break;
      case "C":
        [command, length] = parseCubicCurveAt(path, current);
        break;
      case "Q":
        [command, length] = parseQuadCurveAt(path, current);
        break;
      case "Z":
        invariant(
          startingCommand && startingCommand.type === "move",
          "Path with Z must have M as first command"
        );
        command = {
          type: "line",
          x: startingCommand.x,
          y: startingCommand.y,
        };
        length = 1;
        shouldUpdateStartingCommand = true;
        break;
      default:
        throw new Error(
          `Unsupported SVG command ${path[current]} at position ${current}`
        );
    }
    if (shouldUpdateStartingCommand && path[current] !== "Z") {
      startingCommand = command;
      shouldUpdateStartingCommand = false;
    }

    result.push(command);
    current += length;
    current += countWhitespacesAt(path, current);
  }
  return result;
}
