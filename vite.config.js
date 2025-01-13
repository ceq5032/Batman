
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        open: true,
        overlay: false,
    },
    build: {
        target: 'esnext',
    },
    resolve: {
        alias: {

        },
    },
});

