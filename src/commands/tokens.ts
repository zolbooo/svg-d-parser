import invariant from "ts-invariant";

// Take a first decimal number from input and return the value and resulting length.
// Throws error if no number is found at start.
export function parseDecimalAt(
  value: string,
  start: number = 0
): { value: number; length: number } {
  const result = value.slice(start).match(/-?\d+(\.\d+)?/);
  invariant(result !== null, "Expected number at start of string");
  return {
    value: parseFloat(result[0]),
    length: result[0].length,
  };
}

export function countWhitespacesAt(value: string, start: number = 0): number {
  let i = start;
  for (; i < value.length; i++) {
    if (value[i] !== " ") {
      break;
    }
  }
  return i - start;
}

export function parseTokens(
  value: string,
  tokens: ("number" | "space")[],
  start: number
): [values: number[], length: number] {
  let length = 0;
  const values = tokens.map((token) => {
    const current = start + length;
    if (token === "space") {
      length += countWhitespacesAt(value, current);
      return null;
    }
    const { value: parsedValue, length: parsedLength } = parseDecimalAt(
      value,
      current
    );
    length += parsedLength;
    return parsedValue;
  });
  return [values.filter((value) => value !== null) as number[], length];
}
