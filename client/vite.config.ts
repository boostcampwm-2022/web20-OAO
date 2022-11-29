import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': resolve(__dirname, './src/components'),
      '@container': resolve(__dirname, './src/container'),
      '@core': resolve(__dirname, './src/core'),
      '@todo': resolve(__dirname, './src/core/todo'),
      '@images': resolve(__dirname, './src/images'),
      '@page': resolve(__dirname, './src/page'),
      '@util': resolve(__dirname, './src/util'),
    },
  },
});
