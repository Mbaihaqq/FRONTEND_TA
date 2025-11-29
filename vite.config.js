import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',   // Service worker auto update
      manifest: {
        name: "Aplikasi Laundry Baihaqi",
        short_name: "Laundry",
        description: "Aplikasi Laundry PWA untuk Tugas Pemrograman Perangkat Bergerak",
        theme_color: "#1d4ed8",     // Biru Tailwind
        background_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        icons: [
          {
            src: "/pwa-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/pwa-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
      }
    })
  ]
})
