import { fork } from "child_process";
import { defineConfig } from "rollup";
import { builtinModules } from "module";
import { resolve } from "path";

import commonjs from "@rollup/plugin-commonjs";
import inject from "@rollup/plugin-inject";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const externals = new Set(builtinModules);
externals.add("depd");

function run() {
    let child;
    return {
        closeBundle() {
            const watching = process.env.ROLLUP_WATCH === "true";
            if (child === undefined && watching) {
                child = fork("dist/server.mjs");
            }
        }
    };
}

export default defineConfig({
    input: {
        client: "src/client.tsx",
        server: "src/server.tsx",
        webhot: "src/webhot.tsx",
    },

    external: id => externals.has(id),

    output: {
        dir: "dist",
        entryFileNames: "[name].mjs",
        chunkFileNames: "assets/chunk.[hash].mjs",
        sourcemap: true,
    },

    plugins: [
        json(),
        commonjs(),
        nodeResolve(),
        typescript(),

        inject({
            process: resolve("src/process.ts"),
        }),

        run(),
    ]
});
