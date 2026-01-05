import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import hrcImportPlugin from 'vite-plugin-hrc-import'

// https://vitejs.dev/config/
export default defineConfig({
  // NOTE: `vite-plugin-hrc-import` IS COMPATIBLE with vite@v7, but requires
  // updating its `peerDependencies` to allow `vite@6` and `vite@7` to suppress
  // `unmet peer` warnings.
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
