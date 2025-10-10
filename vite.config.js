import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // يمكنك إضافة إعدادات أخرى هنا لاحقًا إذا احتجتِ
});