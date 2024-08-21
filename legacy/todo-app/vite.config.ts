import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import hrcImportPlugin from "vite-plugin-hrc-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), hrcImportPlugin()],
  base: "/dev-challenges/legacy/todo-app"
})
