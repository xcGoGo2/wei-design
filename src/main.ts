import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index' // 引入router
import Api from './api/index'
import './styles/element/index.scss'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import 'element-plus/dist/index.css'
import * as ElIcons from '@element-plus/icons-vue'
// import './api/mock/index'
import svgIcon from '@/assets/svg/index.vue'
import 'virtual:svg-icons-register'
import WeiRow from '@/components/Layout/Row/index.vue'
import WeiCol from '@/components/Layout/Col/index.vue'
import Echarts from '@/components/Echarts/index.vue'  // echarts组件
// import waycloudUI from '@waycloud/ui'
import 'animate.css/animate.min.css' //引入
import customComponents from '@/custom-components/index';
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia();

// 全局组件
for (const name in ElIcons) {
    app.component(name, (ElIcons as any)[name])
}
app.component('svg-icon', svgIcon)
app.component('wei-row', WeiRow)
app.component('wei-col', WeiCol)
app.component('Echarts', Echarts)

// 自定义组件注册
for (let i = 0; i < customComponents.length; i ++) {
    const item = customComponents[i];
    app.component(item.name, item.component);
}

app.use(router).use(pinia).use(ElementPlus, {locale: zhCn});
// app.config.globalProperties.$api = Api;  // 配置全局数据请求

// 依赖注入配置全局变量 页面中使用 inject 接收
app.provide('global', {
    $api: Api,
})

// 自定义指令
// 使 v-focus 在所有组件中都可用
app.directive('focus', {
    created(el, binding, vnode, prevVnode) {
        el.focus();
    }
})


app.mount('#app')
