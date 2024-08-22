import path from 'path'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import hrcImportPlugin from 'vite-plugin-hrc-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), hrcImportPlugin()],
  base: '/dev-challenges/legacy/country-quiz',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
