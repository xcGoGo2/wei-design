import { reponseType } from '@/type';
import api from '../index';

export default {
  /**
   * 查询目录列表
   * @returns
   */
  addCanvasConfig: async (): Promise<reponseType> => {
    return await api.Post('design/api/design/addCanvasConfig', {});
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
