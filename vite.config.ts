import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@mapbox/mapbox-gl-draw': '@mapbox/mapbox-gl-draw/index.js',
      // Force CJS build to avoid ESM import mutation issues
      'react-mapbox-gl': 'react-mapbox-gl/lib/index.js',
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/,
  },
  optimizeDeps: {
    include: ['mapbox-gl', 'react-mapbox-gl'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})
