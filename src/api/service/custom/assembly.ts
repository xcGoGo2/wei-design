import { reponseType } from '@/type';
import api from '@/api';
export default {
    getAssemblyLists: async (): Promise<reponseType> => {
        return await api.Post('api/weiManage/getAssemblyLists', {});
    }
}