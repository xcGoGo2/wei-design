/*
 * @Author: chenwei
 * @Date: 2022-02-10 11:56:12
 * @LastEditors: chenwei
 * @LastEditTime: 2022-02-10 15:31:51
 * @FilePath: \weiManage\vite.config.ts
 * @Description: 
 * 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),]
})
