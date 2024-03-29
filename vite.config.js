import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { defineConfig,loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  dotenv.config(); // Load environment variables from .env file
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return {
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };
});