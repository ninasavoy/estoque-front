import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  define: {
    // caso queira definir alguma constante global em build (não recomendado para segredos)
  },
  optimizeDeps: {
    include: ["axios"]
  }
});
