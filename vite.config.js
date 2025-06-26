import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  base: '/MoveMaven/',
<<<<<<< HEAD
});
=======
});
>>>>>>> fe2f97ad95b7efbd181b77a7b8de183dc262fc2e
