/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";

import { compression } from "vite-plugin-compression2";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react(), compression()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    css: true,
  },
});
