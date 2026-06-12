import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Frontend-only build — no backend proxy needed.
// Deploys directly to Netlify as a static SPA.
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    port: 5174,
  },

  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 600,
  },
})
