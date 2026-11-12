
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { fileURLToPath } from "url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],

  base: "/",

  build: {
    outDir: "dist",
    emptyOutDir: true,

    rollupOptions: {
      input: {
        index: resolve(root, "index.html"),
        query: resolve(root, "query-adv.html"),
        source: resolve(root, "system-source.html")
      }
    }
  }
});
