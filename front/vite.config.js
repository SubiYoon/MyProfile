import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
    const isProduction = mode === 'production'
    const apiURL = isProduction ? 'https://devstat.app' : 'http://localhost:7777'

    return defineConfig({
        base: './',
        plugins: [vue()],
        server: {
            proxy: {
                '^/api': {
                    target: apiURL,
                    changeOrigin: true,
                    //rewrite: path => path.replace(/^\/api/, ''),
                },
                '/static': {
                    target: apiURL,
                },
            },
            port: 3001,
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
            outDir: '../src/main/webapp/admin',
            emptyOutDir: true,
        },
    })
}
