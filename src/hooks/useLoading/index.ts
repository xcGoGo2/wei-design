import { ElMessage, ElNotification, ElLoading } from 'element-plus';

let loadingInstance = null
export const openLoading = function(option?: any) {
    option = option ? option : {};
    const options = Object.assign({}, option, { text: '拼命加载中', 'background': 'rgba(0, 0, 0, 0.6)' })
    loadingInstance = ElLoading.service(options)
}
export const closeLoading = function() {
    if (loadingInstance) {
        loadingInstance.close()
    }
}


