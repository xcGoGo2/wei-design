<template>
    <div class="sidebar-container" :style="{ width: !isCollapse ? '200px' : '70px' }">
        <div class="logo">
            <el-image fit="cover" src="src/assets/Sidebar/logo.png" alt="weiManage" />
            <span class="title" v-if="!isCollapse">Vue-Wei-Manage</span>
        </div>
        <div class="sidebar-list">
            <el-menu
                default-active="2"
                class="el-menu-vertical"
                :collapse="isCollapse"
                @open="handleOpen"
                @close="handleClose"
            >
                <template v-for="(item, i) in menuList" :key="item.title + i">
                    <el-sub-menu index="i" v-if="item.children">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>Navigator One</span>
                        </template>
                        <el-menu-item-group>
                            <template #title><span>Group One</span></template>
                            <el-menu-item index="1-1">item one</el-menu-item>
                            <el-menu-item index="1-2">item two</el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="1-4">
                            <template #title><span>item four</span></template>
                            <el-menu-item index="1-4-1">item one</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                    <el-menu-item index="2" v-else>
                        <el-icon><icon-menu /></el-icon>
                        <template #title>Navigator Two</template>
                    </el-menu-item>
                </template>
            </el-menu>
        </div>
        <div class="switch-list" :style="{ display: !isCollapse ? 'flex' : 'inline-block' }">
            <div class="switch-item">
                <el-icon v-if="isCollapse" title="收拢" @click="handle.arrow">
                    <arrow-right-bold />
                </el-icon>
                <el-icon v-else title="收拢" @click="handle.arrow"><arrow-left-bold /></el-icon>
            </div>
            <div class="switch-item">
                <el-icon title="浮动" @click="handle.float"><paperclip /></el-icon>
            </div>
            <div class="switch-item">
                <el-icon title="大事记" @click="handle.bigThing"><info-filled /></el-icon>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, PropType } from 'vue';

// type
import { menuListType } from './Sidebar';
export default defineComponent({
    name: 'Sidebar', // 侧边栏
    props: {
        // 标题logo
        logo: {
            type: String,
            default: '../../assets/Sidebar/logo.png',
        },
    },
    setup(props, context) {
        const num = ref(100);
        const { logo } = props;
        console.log(props);

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
            console.log(key, keyPath);
        };
        const handleClose = (key: string, keyPath: string[]) => {
            console.log(key, keyPath);
        };

        // 菜单
        const menuList = reactive<menuListType[]>([
            {
                title: '数据集',
                icon: '/src/assets/Sidebar/menu/boardsheet.png',
            },
            {
                title: '报告',
                icon: '/src/assets/Sidebar/menu/report.png',
            },
            {
                title: '在线表格',
                icon: '/src/assets/Sidebar/menu/sheet.png',
            },
            {
                title: '消息管理',
                icon: '/src/assets/Sidebar/menu/posts.png',
            },
        ]);

        return {
            num,
            data,
            logo,
            handle,
            isCollapse,
            handleOpen,
            handleClose,
            menuList,
        };
    },
});
</script>

<style lang="less">
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
    transition: all 0.5s;
    overflow: hidden;
    white-space: nowrap;
    // color: #ffffff;

    .logo {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;

        .el-image {
            height: 40px;
            width: 40px;
            margin-right: 10px;
        }

        .title {
            color: #3176b1;
            font-size: 1em;
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
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */

        &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
        }

        .sign {
            height: 60px;
            width: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 5px;
            cursor: pointer;

            .el-icon svg {
                font-size: 16px;
            }

            span {
                margin-top: 5px;
                font-weight: 500;
            }
        }

        .selectSign {
            background-color: #41b584;
        }

        .noSelectSign:hover {
            background-color: #323741;
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
.el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
}
</style>
