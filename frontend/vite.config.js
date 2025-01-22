import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = {
    index: path.resolve(__dirname, 'index.html'),
}

const cssFiles = {
    normalize: path.resolve(__dirname, 'src/style/normalize.scss'),
    //index: path.resolve(__dirname, 'src/style/index.scss'),
    //search: path.resolve(__dirname, 'src/style/components/main/section/search/search.scss'),
    //header: path.resolve(__dirname, 'src/style/components/main/section/header/header.scss'),
    //mainCss: path.resolve(__dirname, 'src/style/components/main/main.scss'),
    font: path.resolve(__dirname, 'src/style/helpers/fonts.scss'),
}

export default defineConfig({
    plugins: [
        react()
    ],
    resolve: {
        alias: {
            '~': path.resolve(__dirname, 'src'),
            '@style': path.resolve(__dirname, 'src/style'),
        },
    },
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        rollupOptions: {
            input: {
                ...pages,
                ...cssFiles,
            },
            output: {
                assetFileNames: 'assets/[name].[hash][extname]',
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                mixin: `@import "src/style/helpers/_mixin.scss";`,
            },
        },
    },
})
