import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ✅ สำคัญมากสำหรับ Electron
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT) || 4173,
    allowedHosts: ['client-xmra.onrender.com'], // ✅ เพิ่มตรงนี้
  },
})
