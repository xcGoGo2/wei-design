import { reponseType } from 'type';
import api from '@/api';
export default {
    goodDailySentences: async () => {
        return await api.Get('https://api.xygeng.cn/one', {});
    }
}