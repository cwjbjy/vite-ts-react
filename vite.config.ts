import path from 'path'; //这个path用到了上面安装的@types/node

import react from '@vitejs/plugin-react';
import minimist from 'minimist';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import replace from 'vite-plugin-filter-replace';
// https://vitejs.dev/config/

export default () => {
  return defineConfig({
    plugins: [
      react(),
      replace(
        [
          {
            filter: /\.ts$/,
            replace: {
              from: './routes',
              to: './dev.routerConfig.tsx',
            },
          },
        ],
        {
          apply(config, { command }) {
            const { _ } = minimist(process.argv.slice(2));
            // 开发环境，并且包含启动参数--moduleLoad
            return command === 'serve' && _.includes('--moduleLoad');
          },
        },
      ),
      {
        ...viteCompression(),
        apply: 'build',
      },
      visualizer({ open: true }),
    ],
    //这里进行配置别名
    resolve: {
      alias: {
        '@': path.resolve('./src'), // @代替src
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom', 'zustand'],
            antd: ['antd', '@ant-design/icons'],
            i18: ['i18next', 'react-i18next'],
          },
        },
      },
    },
    base: '/',
    server: {
      open: true,
    },
  });
};
