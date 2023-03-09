<template>
    <div>
        <template v-for="( v ) in menuData">
            <el-submenu v-if="v.subMenus && v.subMenus.length > 0" :key="v[indexKey]" :index="`${v[indexKey]}`">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>{{ v.title }}</span>
                </template>
                <menu-item :menu-data="v.subMenus" :menu-level= 'menuLevel + 1' :key="indexKey" />
            </el-submenu>
            <el-menu-item v-else :key="v[indexKey]" :index="`${v[indexKey]}`">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>{{ v.title }}</span>
                </template>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
import {YJPage} from 'yjpl-core';

export default class MenuItem extends YJPage{
    props() {
        return {
            menuData: {
                type: Array,
                default: () => []
            },
            menuLevel: {
                type: String,
                default: ''
            },
            indexKey: {
                type: String,
                default: 'paixu'
            }
        };
    }
}
</script>
