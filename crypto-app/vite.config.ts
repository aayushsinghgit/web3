import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
    }),
  ],
  resolve: {
    alias: {
      util: 'util'
    }
  },
  define: {
    'process.env': {}
  },
  optimizeDeps: {
    include: ['web3modal', '@walletconnect/web3-provider', 'ethers']
  },
  build: {
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Three.js ecosystem — must be first to avoid circular ref with react
          if (id.includes('node_modules/three') ||
              id.includes('@react-three/fiber') ||
              id.includes('@react-three/drei')) {
            return 'vendor-three';
          }
          // Core React — separate from three to prevent circularity
          if (id.includes('node_modules/react-dom') ||
              id.includes('node_modules/react/') ||
              id.includes('node_modules/react-router-dom') ||
              id.includes('node_modules/scheduler')) {
            return 'vendor-react';
          }
          // Framer Motion
          if (id.includes('node_modules/framer-motion')) {
            return 'vendor-motion';
          }
          // Ethers.js (blockchain)
          if (id.includes('node_modules/ethers') ||
              id.includes('node_modules/@ethersproject')) {
            return 'vendor-ethers';
          }
          // Charts
          if (id.includes('node_modules/recharts') ||
              id.includes('node_modules/d3-') ||
              id.includes('node_modules/victory-')) {
            return 'vendor-charts';
          }
          // UI utilities
          if (id.includes('node_modules/lucide-react') ||
              id.includes('node_modules/react-hot-toast') ||
              id.includes('node_modules/react-countup') ||
              id.includes('node_modules/date-fns') ||
              id.includes('node_modules/gsap')) {
            return 'vendor-ui';
          }
        }
      }
    }
  }
})
