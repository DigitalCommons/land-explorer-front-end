import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  base: "/",
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      // We use a specific git commit of mapbox-gl-draw that doesn't have a proper build, so we need to point to the source file directly
      {
        find: /^@mapbox\/mapbox-gl-draw$/,
        replacement: "@mapbox/mapbox-gl-draw/index.js",
      },
      // Force CJS build to avoid ESM import mutation issues
      {
        find: /^react-mapbox-gl$/,
        replacement: "react-mapbox-gl/lib/index.js",
      },
      // Polyfill Node.js `events` module for browser (required by mapbox-gl-geocoder)
      {
        find: "events",
        replacement: "events/events.js",
      },
    ],
  },
  server: {
    port: 8080,
  },
  build: {
    outDir: "dist",
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    include: ["mapbox-gl", "react-mapbox-gl"],
  },
});
