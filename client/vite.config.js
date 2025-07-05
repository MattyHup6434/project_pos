import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ✅ สำคัญมากสำหรับ Electron
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
})