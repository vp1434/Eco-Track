import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://eco-track-3l62.onrender.com', // Updated to remote backend
        changeOrigin: true,
        secure: false, // Recommended for some https targets if certs are issues, though render should be fine
      }
    }
  }
})
