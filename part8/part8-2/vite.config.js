import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@auth": "/src/components/auth",
      "@authors": "/src/components/authors",
      "@books": "/src/components/books",
      "@graphql": "/backend/graphql",
      "@models": "/backend/graphql",
    },
  },
  build: {
    sourcemap: false,
  },
});
