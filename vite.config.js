import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteCompression({
            algorithm: 'gzip',
            ext: '.gz',
        }),
        viteCompression({
            algorithm: 'brotliCompress',
            ext: '.br',
        })
    ],
    server: {
        port: 5173,
        open: true
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom', 'react-router-dom'],
                    animations: ['framer-motion']
                }
            }
        }
    }
})
