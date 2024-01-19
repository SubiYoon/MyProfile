import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '^/api': {
                target: 'http://localhost:7777',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/static': {
                target: 'http://localhost:7777'
            }
        },
        port: 3000
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        outDir: '../src/main/webapp',
        emptyOutDir: true
    }
})
