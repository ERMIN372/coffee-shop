import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages отдаёт сайт из подпапки с именем репозитория
export default defineConfig({
  base: '/coffee-shop/',
  plugins: [react(), tailwindcss()],
})
