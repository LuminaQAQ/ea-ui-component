import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer'
import entryConfigs from './configs/entryConfig.js';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [
        visualizer({
            open: true,
            gzipSize: true,
            brotliSize: true,
            filename: 'dist/stats.html',
        })
    ],
    build: {
        lib: {
            entry: entryConfigs,
            formats: ['es'],
        },
        rollupOptions: {
            external: [],
            output: {
                manualChunks: undefined,
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
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src/'),
            '@components': resolve(__dirname, 'src/components'),
            '@themes': resolve(__dirname, 'src/themes'),
            '@utils': resolve(__dirname, 'src/utils'),
        }
    }
});
