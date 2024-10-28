import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    manifest: true,
  },

  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate', // Autoupdate Service Worker
      includeAssets: [
        'favicon.ico',
        'favicon.svg',
        'apple-touch-icon.png',
        'favicon-48x48.png',
        'web-app-manifest-192x192.png',
        'web-app-manifest-512x512.png',
      ],
      manifest: {
        name: 'Challenge Logger',
        short_name: 'Challenge Logger',
        description: 'Build your habits',
        theme_color: '#ffffff',
        start_url: '/',
        icons: [
          {
            src: '/web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: '/favicon-48x48.png',
            sizes: '48x48',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
