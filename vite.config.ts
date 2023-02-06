import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { viteMockServe } from 'vite-plugin-mock'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' // svg
import ElementPlus from 'unplugin-element-plus/vite'

function pathResolve(dir: string) {
    return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
    // 路径重定向
    resolve: {
        alias: [
            {
                find: /\/#\//,
                replacement: pathResolve('types'),
            },
            {
                find: '@',
                replacement: pathResolve('src'),
            },
        ],
        dedupe: ['vue'],
    },
    server: {
        // host: '127.0.0.1',
        port: 8999,
        // https: true,
        // proxy: {
        //   '/recommend_api': {
        //     target: 'https://api.juejin.cn/recommend_api',
        //     changeOrigin:true,  // 允许跨域
        //     secure:false, // 允许运行在https上
        //     headers: {
        //       'access-control-allow-credentials': 'true',
        //       'access-control-allow-origin': 'chrome-extension://lecdifefmmfjnjjinhaennhdlmcaeeeb',
        //       'content-type': 'application/json'
        //     },
        //     rewrite: path => path.replace(/^\/recommend_api/, '')
        //   },
        // }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/styles/element/theme-chalk.scss" as *;@use "@/styles/global.scss" as *;`,
            },
        },
    },
    plugins: [
        vue(),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [resolve(process.cwd(), 'src/assets/svg/icons')],
            // 指定symbolId格式
            symbolId: 'icon-[dir]-[name]',
        }),
        // viteMockServe 不生效 - 待解决
        viteMockServe({
            mockPath: '/src/api/mock',
            // 开发打包开关
            localEnabled: true,
            // 生产打包开关
            prodEnabled: true,
            // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件
            supportTs: true,
            // 监视文件更改
            watchFiles: true,
        }),
        AutoImport({
            imports: ['vue'],
        }),
        Components({
            dts: true,
            resolvers: [
                ElementPlusResolver({
                    importStyle: 'sass',
                }),
            ],
        }),
        ElementPlus({
            useSource: true,
        }),
    ],
})

