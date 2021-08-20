import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    reactRefresh()
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  server: {
    host: 'sudoku.terminus.io',
    port: 3300
  },
  build: {
    outDir: 'dist',
    minify: false,
    commonjsOptions: {
      requireReturnsDefault: false,
      transformMixedEsModules: false,
    },
  },
})
