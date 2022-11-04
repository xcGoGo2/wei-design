<template>
    <div class="sidebar-container" :style="{ width: !isCollapse ? '200px' : '70px' }">
        <div class="logo" title="weiManage" @click="router.push('/')">
            <svg-icon name="lightning" size="4em" color="#0ca296"></svg-icon>
            <span class="title" v-if="!isCollapse">Vue-Wei-Manage</span>
        </div>
        <div class="sidebar-list">
            <el-menu :default-active="route.path" ref="elMenu" :router="true" class="el-menu-vertical"
                :unique-opened="true" :collapse="isCollapse" :collapse-transition="false" @open="handleOpen"
                @close="handleClose" @select="selectMenu">
                <template v-for="(item, i) in menuList" :key="item.title + i">
                    <el-sub-menu :index="item.router" v-if="item.children">
                        <template #title>
                            <div class="item-container">
                                <el-icon>
                                    <svg-icon :name="item.icon" color=""></svg-icon>
                                </el-icon>
                                <span v-if="!isCollapse">{{ item.title }}</span>
                            </div>
                        </template>
                        <el-menu-item-group style="padding-left: 10px">
                            <template v-for="(jtem, j) in item.children" :key="`${i}-${j}`">
                                <el-sub-menu :index="jtem.router" v-if="jtem.children">
                                    <template #title>
                                        <div class="item-container">
                                            <el-icon>
                                                <svg-icon :name="jtem.icon" color=""></svg-icon>
                                            </el-icon>
                                            <span>{{ jtem.title }}</span>
                                        </div>
                                    </template>
                                    <el-menu-item-group style="padding-left: 10px">
                                        <el-menu-item :index="item.router" v-for="(mtem, m) in jtem.children"
                                            :key="`${i}-${j}-${m}`">
                                            <div class="item-container">
                                                <el-icon>
                                                    <svg-icon :name="mtem.icon" color=""></svg-icon>
                                                </el-icon>
                                                <span>{{ mtem.title }}</span>
                                            </div>
                                        </el-menu-item>
                                    </el-menu-item-group>
                                </el-sub-menu>
                                <el-menu-item :index="jtem.router" v-else>
                                    <div class="item-container">
                                        <el-icon>
                                            <svg-icon :name="jtem.icon" color=""></svg-icon>
                                        </el-icon>
                                        <span>{{ jtem.title }}</span>
                                    </div>
                                </el-menu-item>
                            </template>
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-menu-item :index="item.router" v-else>
                        <div class="item-container">
                            <el-icon>
                                <svg-icon :name="item.icon" color=""></svg-icon>
                            </el-icon>
                            <span v-if="!isCollapse">{{ item.title }}</span>
                        </div>
                        <template v-if="isCollapse" #title>{{ item.title }}</template>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
        <div class="switch-list" :style="{ display: !isCollapse ? 'flex' : 'inline-block' }">
            <div class="switch-item">
                <el-icon v-if="isCollapse" title="收拢" @click="handle.arrow">
                    <arrow-right-bold />
                </el-icon>
                <el-icon v-else title="收拢" @click="handle.arrow">
                    <arrow-left-bold />
                </el-icon>
            </div>
            <div class="switch-item">
                <el-icon title="浮动" @click="handle.float">
                    <paperclip />
                </el-icon>
            </div>
            <div class="switch-item">
                <el-icon title="大事记" @click="handle.bigThing">
                    <info-filled />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed, PropType } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex'

// type
import { menuListType, reponseType } from '../../../type/index';

import { system } from '../../api/service';
// import { useElementMenu } from '../../hooks/useElementMenu';
export default defineComponent({
    name: 'Sidebar', // 侧边栏
    props: {
        // 标题logo
        logo: {
            type: String,
            default: '../../assets/Sidebar/logo.png',
        },
    },
    async setup(props, context) {
        const num = ref(100);
        const { logo } = props;
        const elMenu = ref(); // ref Menu元素
        const router = useRouter();
        const route = useRoute();
        const store = useStore();

        const data = reactive({
            selectSign: 0,
        });

        // 菜单收拢状态
        const isCollapse = ref(false);

        const handle = reactive({
            // 收拢
            arrow: () => {
                console.log('点击收拢');
                isCollapse.value = !isCollapse.value;
                // context.emit("arrow", isCollapse.value);
            },
            // 浮动
            float: () => {
                console.log('点击浮动');
                context.emit('arrow', '点击浮动');
            },
            // 大事记
            bigThing: () => {
                console.log('大事记');
                context.emit('arrow', '大事记');
            },
        });

        const handleOpen = (key: string, keyPath: string[]) => {
            // debugger
        };
        const handleClose = (key: string, keyPath: string[]) => {
            // debugger
        };
        const selectMenu = (key: string, keyPath: string[]) => {
            // debugger
        };

        // 菜单
        store.dispatch('fetchMenuList');
        const menuList = computed(() => store.state.menuList)

        onMounted(() => { });

        return {
            num,
            data,
            logo,
            handle,
            isCollapse,
            handleOpen,
            handleClose,
            menuList,
            elMenu,
            selectMenu,
            route,
            router
        };
    },
});
</script>

<style lang="less">
html:root {
    --el-menu-item-height: 50px;
    --el-menu-sub-item-height: 50px;
}

.sidebar-container {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    -webkit-box-shadow: 0px 3px 3px #c8c8c8;
    -moz-box-shadow: 0px 3px 3px #c8c8c8;
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.4);
    border-right: 1px solid #dddfe5;
    transition: width 0.25s;
    overflow: hidden;
    white-space: nowrap;
    // color: #ffffff;

    .logo {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        user-select: none;

        .el-image {
            height: 40px;
            width: 40px;
            margin-right: 10px;
        }

        .title {
            color: #0ca296;
            font-size: 1.5em;
            font-weight: 600;
        }
    }

    .sidebar-list {
        width: 100%;
        height: calc(100% - 300px);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        overflow-y: scroll;
        overflow-x: hidden;
        scrollbar-width: none;
        /* firefox */
        -ms-overflow-style: none;
        /* IE 10+ */
        color: #575a64;

        &::-webkit-scrollbar {
            display: none;
            /* Chrome Safari */
        }

        .item-container {
            width: 100%;
            height: 100%;
            display: flex;
            padding-left: 10px;
            align-items: center;
            border-radius: 5px;
            user-select: none;
            transition: background-color 0.2s;

            &:hover {
                background-color: #0ca296;
                // border: 1px solid #0ca296;
                color: #ffffff;
            }
        }

        .el-menu--collapse {
            .item-container {
                align-items: center;
                justify-content: center;
            }
        }
    }

    .switch-list {
        border-top: 0.5px solid #323741;
        width: 100%;
        height: 200px;
        transition: all 0.5s;
        padding-top: 20px;

        .switch-item {
            height: 40px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
    }
}
</style>

<style lang="less">
// elementui 样式自定义
.el-menu-vertical {
    height: 100%;
    border: none;
    border-right: none !important;
}

.el-menu-item .el-menu-tooltip__trigger {
    position: static !important;
    padding: 0 !important;
}

.el-menu-vertical:not(.el-menu--collapse) {
    width: 100%;
    height: 100%;
}

.el-menu-item {
    padding: 5px 10px !important;

    &:hover {
        background-color: transparent !important;
    }

    &.is-active {
        color: #ffffff !important;

        .item-container {

            width: 100%;
            border-radius: 5px;
            background-color: #0ca296;
            // border: 1px solid #0ca296;
            color: #ffffff !important;
        }
    }
}

.el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title {
    color: #0ca296 !important;
}

.el-sub-menu {
    width: 100%;

    .el-menu-item {
        min-width: auto !important;
    }

    .el-sub-menu__title {
        padding: 5px 10px !important;

        &:hover {
            background-color: transparent !important;
            color: #fff;
        }
    }

    .el-menu-item-group__title {
        padding: 0;
    }
}
</style>
