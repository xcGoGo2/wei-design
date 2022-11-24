<template>
    <div class="submenu-container">
        <div class="submenu-title">
            <span>weiManage</span>
        </div>
        <div class="select-title">
            <div class="line"></div>
            <span>{{ title }}</span>
            <div class="line"></div>
        </div>
        <div class="menu-list">
            <ul>
                <li class="menu-list-item" :class="data.selectMenuIndex === i? 'selectMenuStyle': ''" v-for="(item, i) in menuList" @click="handle.selectMenu(i)" :key="i">
                    <el-icon :size="16" color=""><folder-checked /></el-icon>
                    <span class="menu-title">{{item.title}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";

interface menuListType {
    title: string,
    icon: string
}

export default defineComponent({
    name: 'Submenu',  // 子菜单
    props: {
        title: {
            type: String,
            default: '菜单'
        },
        menuList: {
            type: Array as PropType<menuListType[]>,
            default: [
                {
                    title: '子菜单1',
                    icon: ''
                },
                {
                    title: '子菜单2',
                    icon: ''
                },
                {
                    title: '子菜单3',
                    icon: ''
                },
            ]

        }
    },
    setup(props, context) {
        const { title, menuList} = props

        const data = reactive({
            selectMenuIndex: 0
        })

        const handle = reactive({
            selectMenu: (index: number): void => {
                data.selectMenuIndex = index
                context.emit('selectMenuIndex', index)
            }
        })
        return {
            data,
            title,
            menuList,
            handle
        }
    }

})
</script>

<style lang="scss" scoped>
.submenu-container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;

    .submenu-title {
        height: 60px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            font-size: 20px;
            font-weight: 400;
            white-space: nowrap;
        }
    }

    .select-title {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 20px;

        .line {
            height: 1px;
            width: 60px;
            border-top: 1px solid #dddfe5;
        }

        span {
            white-space: nowrap;
        }
    }

    .menu-list {
        width: 100%;
        padding: 0 5px;

        .menu-list-item {
            height: 50px;
            width: 100%;
            padding-left: 20px;
            display: flex;
            align-items: center;
            border-radius: 5px;
            margin: 5px 0;
        }

        .menu-list-item:hover {
            background-color: #ebf8f2;
            color: #64c399;
        }

        .selectMenuStyle {
            background-color: #ebf8f2;
            color: #64c399;
        }
    }
}
</style>
