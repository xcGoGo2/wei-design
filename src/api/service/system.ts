import { menuListType, reponseType } from '@/type';
import api from '../index';

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
    return await api.Get('design/api/menu/getMenuList', {});
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
