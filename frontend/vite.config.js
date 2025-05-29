import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => ({
    plugins: [
        react()
    ],
    server: {
        proxy: {
            '/api': 'http://localhost:8080'
        }
    },
    resolve: {
        alias: {
            '@app': path.resolve(__dirname, 'src/app'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@widgets': path.resolve(__dirname, 'src/widgets'),
            '@features': path.resolve(__dirname, 'src/features'),
            '@entities': path.resolve(__dirname, 'src/entities'),
            '@shared': path.resolve(__dirname, 'src/shared'),
        },
    },
    build: {
        sourcemap: mode !== 'production',
        cssCodeSplit: true,
        assetsInlineLimit: 8_192,
        outDir: path.resolve(__dirname, 'dist'),
        rollupOptions: {
            output: {
                assetFileNames: 'assets/[name].[hash][extname]',
            },
        },
    },
    css: {
        modules: {
            generateScopedName: mode === 'production'
                ? '[local]--[hash:base64:1]'//[name]--[hash:base64:6]
                : '[local]--[hash:base64:1]',
        },
        preprocessorOptions: {
            scss: {
                additionalData: `
                @use "@shared/styles/helpers/_fonts.scss" as *;
                @use "@shared/styles/helpers/_mixins.scss" as *;
                `,
            }
        }
    },
    optimizeDeps: {
        include: ['date-fns/esm'],
    },
}))