import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@root": new URL("./", import.meta.url).pathname,
    },
  },
  test: {
    environment: "jsdom",
  },
});
