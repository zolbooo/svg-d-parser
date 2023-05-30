export default [
  {
    input: "src/index.ts",
    output: {
      dir: "lib/cjs",
      format: "cjs",
      sourcemap: true,
    },
  },
  {
    input: "src/index.ts",
    output: {
      dir: "lib/esm",
      format: "esm",
      sourcemap: true,
    },
  },
];
