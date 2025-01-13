import postcss from "rollup-plugin-postcss";
import uglify from "rollup-plugin-uglify";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { readFileSync } from "fs";
import { defineConfig } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import external from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import typescriptEngine from "typescript";

const pkg = JSON.parse(readFileSync("./package.json"));

const transformStyles = postcss({
  extract: "css/aos.css",
  plugins: [autoprefixer, cssnano],
});

const input = "src/js/aos.ts";

export default defineConfig(
  {
    input: input,
    output: [
      {
        file: pkg.browser,
        name: "AOS",
        format: "umd",
        exports: "auto",
        sourcemap: process.env.NODE_ENV === "dev",
      },
      {
        file: pkg.module,
        format: "cjs",
        sourcemap: process.env.NODE_ENV === "dev",
        exports: "auto",
        name: "AOS",
      },
      {
        file: pkg.main,
        format: "es",
        exports: "auto",
        name: "AOS",
        sourcemap: process.env.NODE_ENV === "dev",
      },
    ],
    plugins: [
      transformStyles,
      external({ includeDependencies: true }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        typescript: typescriptEngine,
        sourceMap: false,
        exclude: [
          "coverage",
          ".storybook",
          "storybook-static",
          "config",
          "dist",
          "node_modules/**",
          "*.cjs",
          "*.mjs",
          "**/__snapshots__/*",
          "**/__tests__",
          "**/*.test.js+(|x)",
          "**/*.test.ts+(|x)",
          "**/*.mdx",
          "**/*.story.ts+(|x)",
          "**/*.story.js+(|x)",
          "**/*.stories.ts+(|x)",
          "**/*.stories.js+(|x)",
          "setupTests.ts",
          "vitest.config.ts",
        ],
      }),
      uglify,
    ],
  },
  {
    input: "dist/esm/types/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.(sc|sa|c)ss$/],
    plugins: [transformStyles, dts()],
  },
);

// export default [
//   {
//     input,
//     output: {
//       file: pkg.browser,
//       name: 'AOS',
//       format: 'umd',
//       sourcemap: process.env.NODE_ENV === 'dev'
//     },
//     plugins: [
//       transformStyles,
//       resolve(),
//       commonjs(),
//       babel({
//         exclude: ['node_modules/**']
//       }),
//       uglify()
//     ]
//   },
//   {
//     input,
//     external: Object.keys(pkg.dependencies),
//     output: [
//       { file: pkg.main, format: 'cjs' },
//       { file: pkg.module, format: 'es' }
//     ],
//     plugins: [
//       transformStyles,
//       babel({
//         exclude: ['node_modules/**']
//       })
//     ]
//   }
// ];
