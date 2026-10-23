import { defineConfig } from "astro/config";
export default defineConfig({
  site: "https://jerrylinyx.github.io",
  output: "static",
  outDir: "./build",
  publicDir: "./static",
  trailingSlash: "always",
  build: { inlineStylesheets: "never" },
  vite: { build: { chunkSizeWarningLimit: 1500 } },
});
