/*
 * @Author: chenwei
 * @Date: 2022-02-10 14:07:11
 * @LastEditors: chenwei
 * @LastEditTime: 2022-02-10 14:43:43
 * @FilePath: \weiManage\src\store\index.ts
 * @Description: 
 * 
 */
import { createStore } from 'vuex'

// 创建store实例
export default createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        addCount(state: any) {
            state.count++
        }
    }
})