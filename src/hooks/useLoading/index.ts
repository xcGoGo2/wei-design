import { ElMessage, ElNotification, ElLoading } from 'element-plus';

let loadingInstance: any = null
export const openLoading = function(option?: any) {
    option = option ? option : {};
    const options = Object.assign({}, { text: '拼命加载中', 'background': 'rgba(0, 0, 0, 0.1)' }, option)
    loadingInstance = ElLoading.service(options)
}
export const closeLoading = function() {
    if (loadingInstance) {
        loadingInstance.close()
    }
}


