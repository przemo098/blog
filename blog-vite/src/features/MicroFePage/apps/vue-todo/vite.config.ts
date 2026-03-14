import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
  ],
  build: {
    lib: {
      entry: 'src/main.ts',
      formats: ['iife'],
      name: 'VueTodoMfe',
      fileName: () => 'vue-todo.js',
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
});
