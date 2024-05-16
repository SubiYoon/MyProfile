import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import vitePluginSvgr from 'vite-plugin-svgr';
import dotenv from 'dotenv'; // import dotenv

// Load environment variables from .env file

export default ({ mode }) => {
    dotenv.config({ path: `.env.${mode}` });
    // console.log('env', mode);
    const apiURL = process.env.VITE_API_URL;

    console.log('apiURL', apiURL);

    return defineConfig({
        plugins: [viteReact(), vitePluginSvgr()],
        server: {
            proxy: {
                '^/api': {
                    target: apiURL,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                    ws: true,
                },
                '/static': {
                    target: apiURL,
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
            outDir: '../../src/main/webapp',
            emptyOutDir: true,
        },
        root: './src',
    });
};
