import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // Firebase — large, rarely changes
          "vendor-firebase": ["firebase/app", "firebase/auth", "firebase/firestore", "firebase/analytics"],
          // Animation libs
          "vendor-motion": ["framer-motion"],
          // 3D / background — heaviest, only used on main page
          "vendor-three": ["three", "@react-three/fiber", "@react-three/drei", "maath", "vanta"],
          // UI
          "vendor-ui": ["@radix-ui/react-dialog", "@radix-ui/react-tabs", "@radix-ui/react-tooltip", "lucide-react"],
          // Toast
          "vendor-toast": ["goey-toast"],
        },
      },
    },
    // Warn if any chunk exceeds 600kb
    chunkSizeWarningLimit: 600,
  },
}));
