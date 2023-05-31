import { SvgCommand } from "./commands";

export function composePath(commands: SvgCommand[]): string {
  let result = "";
  for (const command of commands) {
    switch (command.type) {
      case "move":
        result += `M${command.x} ${command.y}`;
        break;
      case "line":
        result += `L${command.x} ${command.y}`;
        break;
      case "relLine":
        result += `l${command.dx} ${command.dy}`;
        break;
      case "quadBezier":
        result += `Q${command.controlX} ${command.controlY} ${command.targetX} ${command.targetY}`;
        break;
      case "cubicBezier":
        result += `Q${command.control1X} ${command.control1Y} ${command.control2X} ${command.control2Y} ${command.targetX} ${command.targetY}`;
        break;
    }
  }
  return result;
}
export function composePathWorklet(commands: SvgCommand[]): string {
  "worklet";
  let result = "";
  for (const command of commands) {
    switch (command.type) {
      case "move":
        result += `M${command.x} ${command.y}`;
        break;
      case "line":
        result += `L${command.x} ${command.y}`;
        break;
      case "relLine":
        result += `l${command.dx} ${command.dy}`;
        break;
      case "quadBezier":
        result += `Q${command.controlX} ${command.controlY} ${command.targetX} ${command.targetY}`;
        break;
      case "cubicBezier":
        result += `Q${command.control1X} ${command.control1Y} ${command.control2X} ${command.control2Y} ${command.targetX} ${command.targetY}`;
        break;
    }
  }
  return result;
}
