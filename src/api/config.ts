/*
 * @Author: chenwei
 * @Date: 2022-02-11 12:52:42
 * @LastEditors: chenwei
 * @LastEditTime: 2022-02-11 14:06:21
 * @FilePath: \weiDesign\src\api\config.ts
 * @Description: 数据请求配置
 *
 */
import { useStorage } from '@/hooks/useStorage'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const { get } = useStorage('session')
// 创建axios实例
const instance = axios.create({
    // baseURL: '',
    timeout: 3000,
    headers: {
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
})

// 请求拦截
instance.interceptors.request.use(
    (config: any) => {
        const designToken = get('design.token')
        // 自定义header，可添加项目token
        if (designToken) {
            config.headers['design.token'] = designToken
            config.headers.timestamp = new Date().getTime()
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// 响应拦截
instance.interceptors.response.use(
    (response) => {
        const resCode = response.status
        const status = response.data.status
        if(resCode === 200 && status === 'success') {
            return Promise.resolve(response)
        }
        // 失败处理 多个处理组装成为一个
        if (resCode === 200 && status === 'failure') {
            const errMsg = (response.data.errors || []).map((o: any) => {
                return o.errmsg
            }).join(",")
            ElMessage.error(errMsg || "未知错误，请联系开发人员")
            return Promise.reject(response)
        }
        if( resCode !== 200 ) {
            ElMessage.error(response.data)
            return Promise.reject(response)
        }
    },
    (error) => {
        // const resCode = error.response.status;
        // switch (resCode) {
        //   case 401:
        //     vm.$Message.error(error.response.data.message);
        //     store.commit('logout', this);
        //     store.commit('clearOpenedSubmenu');
        //     // console.log('token-0', store.state.app.token);
        //     router.replace({
        //       name: 'login'
        //     });
        //     break;
        //   case 404:
        //     vm.$Message.error('网络请求不存在');
        //     break;
        //   case 500:
        //     vm.$Message.error('服务器连接错误');
        //     break;
        //   // 其他状态码错误提示
        //   default:
        //     vm.$Message.error(error.response.data.message);
        // }
        return Promise.reject(error)
    }
)

export default instance

