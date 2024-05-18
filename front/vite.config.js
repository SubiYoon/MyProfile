import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default ({ mode }) => {
    dotenv.config({ path: `.env.${mode}` })
    const apiURL = process.env.VITE_API_SERVER_URL

    return defineConfig({
        base: './',
        plugins: [
            vue({
                template: { transformAssetUrls },
            }),
            quasar({
                // sassVariables: 'src/quasar-variables.sass',
            }),
        ],
        server: {
            proxy: {
                '^/api': {
                    target: apiURL,
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/api/, ''),
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
