import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  input: ['index.html', 'bilkin/index.html'],
  plugins: [react(), tailwindcss()],

  server: {
    watch: {
      usePolling: true,
    },
  },
})
