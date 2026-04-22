import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    force: true,
    watch: {
      usePolling: true,
      interval: 1000
    }
  },
  optimizeDeps: {
    force: true,
    entries: ['src/main.jsx'] // Update if your entry point is different
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'mui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          'chart-vendor': ['recharts', 'date-fns']
        }
      }
    }
  }
})