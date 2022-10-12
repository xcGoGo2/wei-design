import { createStore } from 'vuex'
import { stateType, reponseType, menuListType } from "type";
import { system } from '@/api/service';
// 创建store实例
export default createStore({
    state(): stateType {
        return {
            count: 0,  // 测试
            menuList: []  // 菜单list
        }
    },
    getters: {

    },
    mutations: {
        addCount(state: any) {
            state.count++
        },
        setMenuList(state: stateType, data: menuListType[]) {
            state.menuList = data;
        }
    },
    actions: {
        addCount(context) {

        },
        async fetchMenuList(context) {
            const res = await system.getMenuList();
            context.commit('setMenuList', res.data);
        }
    }
})