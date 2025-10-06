import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: './',
  build: {
    outDir: 'dist', // ✅ 'build' emas
    emptyOutDir: true, // eski build fayllarni tozalaydi
    target: 'esnext',
  },
  server: {
    port: 3000,
    open: true,
  },
});
