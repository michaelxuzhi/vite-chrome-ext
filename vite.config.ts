import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import webExtension from '@samrum/vite-plugin-web-extension'
import manifest from './src/manifest'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
        },
    },
    server: {
        port: 9999,
    },
    plugins: [
        vue(),
        webExtension({
            manifest: {
                ...manifest,
            },
            additionalInputs: {
                scripts: [
                    'src/entries/content/inject.js',
                    'src/entries/content/main.ts',
                    'src/entries/devtool/devtool_in.js',
                    'src/entries/devtool/devtool_out.js',
                ],
                html: [
                    'src/entries/devtool/devtool_page_in.html',
                    'src/entries/devtool/devtool_page_out.html',
                ],
            },
        }),
    ],
})
