import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Default to "/" so local dev and Vercel deploys behave like the live site.
// Switch this to "/repo-name/" only if you specifically deploy to GitHub Pages.
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          gsap: ["gsap"],
          lenis: ["lenis"],
        },
      },
    },
  },
});
