import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dsv from '@rollup/plugin-dsv'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import path from 'path'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), dsv()],
// })

export default defineConfig({
  base: '/timer/',
  plugins: [
    react(),
    dsv(),
    nodePolyfills({
      include: ['path', 'stream', 'util', 'crypto'],
      exclude: ['http'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
        crypto: true,
      },
      overrides: {
        fs: 'memfs',
      },
      protocolImports: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
