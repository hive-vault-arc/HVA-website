import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('node_modules/dotted-map')) {
            return 'vendor-map';
          }

          if (
            id.includes('node_modules/ogl') ||
            id.includes('node_modules/three') ||
            id.includes('node_modules/@splinetool')
          ) {
            return 'vendor-3d';
          }

          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/gsap')) {
            return 'vendor-motion';
          }

          if (id.includes('node_modules/react-icons') || id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
});
