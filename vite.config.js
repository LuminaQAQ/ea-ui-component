import { defineConfig } from 'vite';
import entryConfigs from './configs/entryConfig.js';

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
                assetFileNames: 'assets/[name].[ext]'
            },
        },
        minify: true,
        cssCodeSplit: false,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "src/components/ea-ui-base-style.scss";
                `,
                includePaths: ['src/themes/dark.scss']
            }
        }
    },
});
