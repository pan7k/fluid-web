import autoprefixer from "autoprefixer";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import tailwindcss from "tailwindcss";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { createRequire } from "node:module";
import { visualizer } from "rollup-plugin-visualizer";

const requireFile = createRequire(import.meta.url);
const packageJson = requireFile("./package.json");

export default [
  {
    input: "core/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
      {
        file: "dist/index.js",
        format: "umd",
        name: "Fluid",
        globals: {
          clsx: "clsx",
          react: "React",
          "react-dom": "ReactDOM",
          "tailwind-merge": "twMerge",
          "@phosphor-icons/react": "PhosphorIcons",
        },
      },
    ],
    plugins: [
      commonjs(),
      peerDepsExternal(),
      postcss({
        plugins: [(tailwindcss, autoprefixer)],
        inject: false,
        minimize: true,
        extract: "index.css",
      }),
      terser(),
      typescript({
        tsconfig: "tsconfig.build.json",
      }),
      visualizer({ template: "sunburst" }),
    ],
    external: ["react-router-dom"],
  },
  {
    input: "dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
