import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
    // The single-file preview build cannot load extra chunks, so fold them in.
    rollupOptions: mode === "artifact" ? { output: { inlineDynamicImports: true } } : {},
  },
}));
