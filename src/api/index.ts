import instance from "./config"
import { reponseType } from "@/type"

const requestHeaderMap = {

}
// 封装数据请求方法
export default {
    /**
    *封装get方法
    *@params{String} url [请求地址]
    *@params{Object} params [请求参数]
    */
    Get(url: string, params: object): Promise<reponseType> {
        return new Promise((resolve, reject) => {
            instance.get(url, {
                params: params
            }).then((res) => {
                resolve(res.data)
            }).catch(error => {
                reject(error.data)
            })
        })
    },
    /**
    *封装post方法
    *@params{String} url [请求地址]
    *@params{Object} data [请求参数]
    */
    Post(url: string, params: object, config?: object): Promise<reponseType> {

        return new Promise((resolve, reject) => {
            instance.post(url, params, config).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error.data);
            })
        })

    },
    /**
     *封装put方法
     *@param{String} url 请求地址
     *@param{Object} params 请求参数
     */
    Put(url: string, params: object, config?: object): Promise<reponseType> {
        return new Promise((resolve, reject) => {
            instance.put(url, params, config).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error.data);
            })
        })
    },
    /**
 *封装patch方法
 *@param{String} url 请求地址
 *@param{Object} params 请求参数
 */
    Patch(url: string, params: object, config?: object): Promise<reponseType> {
        return new Promise((resolve, reject) => {
            instance.put(url, params, config).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error.data);
            })
        })
    },

    /**
     *封装delete方法
     *@param{String} url [请求地址]
     *@param{Object} params [请求参数]
     */
    Delete(url: string, params: object): Promise<reponseType> {
        return new Promise((resolve, reject) => {
            instance.delete(url, {
                params: params
            }).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error.data);
            })
        })
    }
}
