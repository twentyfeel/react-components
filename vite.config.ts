import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { webfontDownload } from "vite-plugin-webfont-dl";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), webfontDownload(), svgr()],
});
