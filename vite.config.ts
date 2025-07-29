import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import app from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      // Usa o app Express exportado como default, mas apenas para rotas específicas
      server.middlewares.use('/api', (req: any, res: any, next: any) => {
        // Remove o prefixo /api antes de passar para o Express
        req.url = req.url.replace(/^\/api/, '');
        app(req, res, next);
      });
      
      // Adiciona o endpoint /health
      server.middlewares.use('/health', (req: any, res: any, next: any) => {
        app(req, res, next);
      });
    },
  };
}
