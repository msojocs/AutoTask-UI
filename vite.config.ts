import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import vueI18n from '@intlify/vite-plugin-vue-i18n'
import vueJsx from '@vitejs/plugin-vue-jsx' // 要安装@vitejs/plugin-vue-jsx

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    AutoImport({ /* options */
      imports: ["vue", "vue-router"]
    }),
    vueI18n({
      include: path.resolve(__dirname, './src/locales/**'),
    }),
    vueJsx({}),
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['vue'],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://47.107.110.35:6061",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },

})
