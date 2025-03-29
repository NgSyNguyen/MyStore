import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  // Cấu hình build
  build: {
    emptyOutDir: false, // Không xóa thư mục dist trước khi build
    outDir: 'dist', // Thư mục đầu ra
    assetsDir: 'assets', // Thư mục chứa tài nguyên tĩnh
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // Tách các dependency thành chunk riêng
          }
        },
      },
    },
  },

  // Cấu hình plugin
  plugins: [react()],

  // Cấu hình base URL cho deploy
  base: '/JinStore/',

  // Cấu hình resolve
  resolve: {
    extensions: ['.js', '.jsx', '.json'], // Thêm .json để hỗ trợ file JSON
    alias: {
      '@': path.resolve(__dirname, 'src'), // Thư mục gốc src
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@json': path.resolve(__dirname, 'src/json'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@redux': path.resolve(__dirname, 'src/redux'), // Thêm alias cho thư mục redux
    },
  },

  // Cấu hình server
  server: {
    open: true, // Mở trình duyệt tự động khi dev
    hmr: {
      overlay: true, // Bật overlay lỗi (có thể tắt nếu cần: overlay: false)
    },
    port: 3000, // Cổng mặc định
  },

  // Cấu hình optimizeDeps (tối ưu hóa dependency)
  optimizeDeps: {
    include: ['react', 'react-dom'], // Tối ưu hóa các gói cơ bản
  },
});
