import { defineConfig } from 'vite';
import path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    host: '0.0.0.0',
    port: 3001,
    open: false,
  },
  //这里进行配置别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @代替src
    },
  },
})
