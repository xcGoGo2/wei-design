import { createStore } from 'vuex'
import { stateType } from "type";
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
        }
    },
    actions: {
        addCount(context) {

        },
        fetchMenuList(context) {
            
        }
    }
})