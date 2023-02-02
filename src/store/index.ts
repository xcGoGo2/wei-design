import { createStore } from 'vuex'
import { stateType, reponseType, menuListType, Compnents } from "@/type";
import { system, myDesign } from '@/api/service';
// 创建store实例
export default createStore({
    state(): { componentsList: any[]; menuList: any[]; canvasScale: number; count: number; curComponentIndex: number; loginContent: {} } {
        return {
            count: 0,  // 测试
            loginContent: {},  // 登录用户信息
            menuList: [],  // 菜单list
            componentsList: [],
            curComponentIndex: -1, // 当前选中组件
            canvasScale: 1
        }
    },
    getters: {

    },
    mutations: {
        addCount(state: any) {
            state.count++
        },
        setLoginContent(state, data) {
            state.loginContent = data;
        },
        setMenuList(state: stateType, data: menuListType[]) {
            state.menuList = data;
        },
        setComponentsList(state: stateType, data: Compnents[]) {
            state.componentsList = data;
        },
        setComponentIndex(state: stateType, data: number) {
            state.curComponentIndex = data;
        },
        setCanvasScale(state: stateType, data: number) {
            state.canvasScale = data;
        },

    },
    actions: {
        addCount(context) {

        },
        async fetchMenuList(context) {
            const res = await system.getMenuList();
            context.commit('setMenuList', res.data);
        },
        async fetchComponentsList(context) {
            const res = await myDesign.fetchComponentsList();
            context.commit('setComponentsList', res.data);
        },
    }
})
