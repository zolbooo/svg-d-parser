export default [
  {
    input: "src/index.ts",
    output: {
      file: "lib/cjs/index.js",
      format: "cjs",
      sourcemap: true,
    },
  },
  {
    input: "src/index.ts",
    output: {
      file: "lib/esm/index.js",
      format: "esm",
      sourcemap: true,
    },
  },
];
