import { menuListType, reponseType } from "../../../type";
import api from "../index";

export default {
  /**
   * 查询目录列表
   * @returns 
   */
  getMenuList: async (): Promise<reponseType> => {
    return await api.Get('api/weiManage/getUsers', {});
  }
}
