import { menuListType, reponseType } from '@/type';
import api from '../index';

const _api = 'api/weiManage'
export default {
  /**
   * 测试mock
   * @returns 
   */
  getUsers: async (): Promise<reponseType> => {
    return await api.Get('api/weiManage/getUsers', {});
  },
  /**
   * 查询目录列表
   * @returns
   */
  getMenuList: async (): Promise<reponseType> => {
    return await api.Post('api/weiManage/getMenuLists', {});
  },
  /**
   * 登录
   * @returns 
   */
  login: async (loginData: {
    username: string;
    password: string;
  }) => {
    return await api.Post('api/weiManage/login', {username: loginData.username, password: loginData.password});
  },
};
