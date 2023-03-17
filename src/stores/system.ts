import { defineStore } from 'pinia';
import { system } from "@/api/service";
import { menuListType } from '@/type';
import { getItem } from '@/utils';

export const useSystemStore = defineStore('system', () => {
    const menuList = ref<menuListType[]>([]);  // 菜单list

    async function fetchMenuList() {
        const res = await system.getMenuList();
        if(res.data) {
            menuList.value = res.data;
        }
    }

    // 登录用户信息
    function loginContent () {
        return getItem("loginContent");
    }

    return {
        loginContent,
        menuList,
        fetchMenuList
    }
})
