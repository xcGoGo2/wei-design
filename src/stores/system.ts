import { defineStore } from 'pinia';
import { system } from "@/api/service";
import { menuListType } from '@/type'

export const useSystemStore = defineStore('system', () => {
    const loginContent = ref({});   // 登录用户信息
    const menuList = ref<menuListType[]>([]);  // 菜单list

    async function fetchMenuList() {
        const res = await system.getMenuList();
        if(res.data) {
            menuList.value = res.data;
        }
    }

    return {
        loginContent,
        menuList,
        fetchMenuList
    }
})
