import { defineConfig } from 'vite';
import entryConfigs from './configs/entryConfig.js';
import { resolve } from 'node:path';

export default defineConfig({
    build: {
        lib: {
            entry: entryConfigs,
            formats: ['es'],
        },
        rollupOptions: {
            external: [],
            output: {
                entryFileNames: 'components/[name].js',
                chunkFileNames: 'components/[name].js',
                assetFileNames: 'assets/icon.[ext]'
            },
        },
        minify: true,
        cssCodeSplit: false,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "components/ea-ui-base-style.scss";
                `,
                includePaths: [resolve(__dirname, 'src')]
            }
        }
    },
});
