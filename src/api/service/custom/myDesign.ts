import { reponseType } from '@/type';
import api from '@/api';
export default {
    fetchComponentsList: async (): Promise<reponseType> => {
        return await api.Post('api/weiDesign/getComponentsList', {});
    }
}
