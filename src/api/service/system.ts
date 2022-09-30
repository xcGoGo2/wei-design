import { menuListType, reponseType } from '../../../type';
import api from '../index';

const _api = 'api/weiManage'
export default {
  /**
   * 查询目录列表
   * @returns
   */
  getMenuList: async (): Promise<reponseType> => {
    return await api.Get('api/weiManage/getUsers', {});
  },
  login: async () => {
    return await api.Post('api/weiManage/login', {});
  },
};
