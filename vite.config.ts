import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'monorepo-utils',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
  },
  resolve: {
    alias: {
      src: resolve('src/'),
    },
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
      exclude: ['**/spec/'],
    }),
  ],
});
