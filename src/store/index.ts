import { createStore, useStore as baseUseStore, Store } from 'vuex'
import { stateType, reponseType, menuListType, Compnents } from "@/type";
import { system, myDesign } from '@/api/service';
import { RootStateTypes } from '@/store/interface'
import weiDesign from './modules/weiDesign'
// 创建store实例
export default createStore<RootStateTypes>({
    state() {
        return {
            count: 0,  // 测试
            loginContent: {},  // 登录用户信息
            menuList: [],  // 菜单list
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
        setMenuList(state: RootStateTypes, data: menuListType[]) {
            debugger
            state.menuList = data;
        }
    },
    actions: {
        addCount(context) {

        },
        async fetchMenuList(context) {
            const res = await system.getMenuList();
            context.commit('setMenuList', res.data);
        },
    },
    modules: {
        weiDesign
    }
})

