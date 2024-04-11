import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';
import viteReact from '@vitejs/plugin-react';
import vitePluginSvgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [viteReact(), vitePluginSvgr()],
  server: {
    proxy: {
      '^/api': {
        target: 'http://localhost:7777',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/static': {
        target: 'http://localhost:7777',
      },
    },
    port: 3000,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // rollupOptions: {
    //     input: '/index.jsx' // 진입점을 index.js로 설정
    // },
    outDir: '../../src/main/webapp',
    emptyOutDir: true,
  },
  root: './src', // 프로젝트 루트 디렉토리 설정
});
