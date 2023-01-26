/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
    plugins: [
        react(),
        svgrPlugin({
            svgrOptions: {
                icon: true,
            },
        }),
    ],
    resolve: {
        alias: {
            "@granity-engine": path.resolve(__dirname, "./src"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.ts",
        coverage: {
            reporter: ["text", "html"],
            exclude: ["node_modules/", "src/setupTests.ts"],
        },
    },
});