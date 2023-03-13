import { menuListType, reponseType } from '@/type';
import api from '../index';

const _api = 'api/weiDesign'
export default {
  /**
   * 测试mock
   * @returns
   */
  getUsers: async (): Promise<reponseType> => {
    return await api.Get('api/weiDesign/getUsers', {});
  },
  /**
   * 查询目录列表
   * @returns
   */
  getMenuList: async (): Promise<reponseType> => {
    return await api.Post('api/weiDesign/getMenuLists', {});
  },
  /**
   * 登录
   * @returns
   */
  login: async (loginData: {
    username: string;
    password: string;
  }): Promise<reponseType> => {
    return await api.Post('design/api/user/login', {username: loginData.username, password: loginData.password});
  },
};
