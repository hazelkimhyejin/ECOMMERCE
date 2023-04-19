import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      
    },
  },
  test: {
    // includeSource: ["src/**/*.{js,jsx}"]
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup/setup.js',
  },
})
