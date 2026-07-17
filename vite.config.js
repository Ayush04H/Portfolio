import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
    plugins: [
        react({
            // Enable React fast refresh
            fastRefresh: true,
        }),
        viteCompression({ algorithm: 'gzip',          ext: '.gz' }),
        viteCompression({ algorithm: 'brotliCompress', ext: '.br' }),
    ],
    server: {
        port: 5173,
        open: true,
        // Pre-bundle deps for faster cold start
        warmup: {
            clientFiles: ['./src/App.jsx', './src/components/Hero.jsx'],
        },
    },
    build: {
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        // Raise warning threshold — Three.js legitimately large
        chunkSizeWarningLimit: 800,
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                // Aggressive tree-shaking
                passes: 2,
                pure_funcs: ['console.log', 'console.info'],
            },
            mangle: { toplevel: true },
        },
        rollupOptions: {
            output: {
                // Fine-grained code splitting
                manualChunks(id) {
                    // Three.js ecosystem — heaviest, lazy-loaded chunk
                    if (id.includes('three') || id.includes('@react-three')) {
                        return 'three-vendor'
                    }
                    // GSAP animation engine
                    if (id.includes('gsap')) {
                        return 'gsap-vendor'
                    }
                    // Lenis smooth scroll
                    if (id.includes('lenis')) {
                        return 'lenis-vendor'
                    }
                    // Lucide icons
                    if (id.includes('lucide')) {
                        return 'icons-vendor'
                    }
                    // React + all other node_modules → vendor
                    if (id.includes('node_modules')) {
                        return 'vendor'
                    }
                },
                // Asset file naming for better cache control
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js',
                assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
            },
        },
    },
    // Optimise deps pre-bundling
    optimizeDeps: {
        include: ['gsap', 'gsap/ScrollTrigger', 'lenis', 'lucide-react'],
        exclude: ['@react-three/fiber', '@react-three/drei', 'three'],
    },
})
