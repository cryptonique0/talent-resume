import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./test/setup.js'],
    include: ['test/**/*.test.jsx'],
    exclude: ['test/Rewards.test.js'],
    coverage: {
      provider: 'v8',
      thresholds: {
        lines: 10,
        functions: 5,
        branches: 5,
        statements: 10
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'react-vendor'
            if (id.includes('wagmi')) return 'wagmi-vendor'
            return 'vendor'
          }
        }
      }
    }
  }
})
