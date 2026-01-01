import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import hrcImportPlugin from 'vite-plugin-hrc-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), hrcImportPlugin()],
  base: '/dev-challenges/legacy/country-quiz',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
