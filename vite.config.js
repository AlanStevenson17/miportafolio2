import { defineConfig } from "vite";
import purgeCss from "vite-plugin-purgecss";

export default defineConfig({
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true
  },
  plugins: [
    purgeCss()
  ]
});
