<template>
    <div class="quick-links-container-box">
        <TransitionGroup class="quick-links-container" name='sort' tag='div'>
            <div
                class="links-item"
                :title="item.title"
                draggable="true"
                v-for="(item, i) in linkList"
                @drag="dragItem(i, item, $event)"
                @dragstart="dragstartItem(i, item, $event)"
                @dragover="dragoverItem(i, item, $event)"
                @dragenter.prevent.stop="dragenterItem(i, item, $event)"
                @dragend='dragendItem'
                :key="item.title + item.icon"
                :data-index="i"
                ref="linkRef"
            >
                <svg-icon :name="item.icon" size="2em" :color='item.iconColor'></svg-icon>
                <span class="title">{{ item.title }}</span>
            </div>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import { getRandomColor, debounce } from '@/utils';
import { menuListType } from '../../../../../../type';

interface linkListType {
    title: string;
    icon: string;
    link: string;
    iconColor: string;
}

const linkRef = ref(null);
const linkList: linkListType[] = reactive([
    {
        title: '首页',
        icon: 'index',
        link: '/index',
    },
    {
        title: '组件',
        icon: 'assembly',
        link: '/assembly',
    },
    {
        title: '数据集',
        icon: 'boardsheet',
        link: '/boardsheet',
    },
    {
        title: '界面设计',
        icon: 'myDesign',
        link: '/weiDesign/myDesign',
    },
    {
        title: '模板市场',
        icon: 'tplMarket',
        link: '/weiDesign/tplMarket',
    },
    {
        title: '用户管理',
        icon: 'userManage',
        link: '/manage/userManage',
    },
    {
        title: '组织管理',
        icon: 'userGroupManage',
        link: '/manage/userGroupManage',
    },
    {
        title: '404',
        icon: 'is404',
        link: '/errPage/is404',
    },
    {
        title: '500',
        icon: 'is500',
        link: '/errPage/is500',
    }
].map((o: any) => {
    o.iconColor = getRandomColor();
    return o;
}));

let dragIndex = ref(0);
const dragItem = (i: number, item: any, e: any) => {
    //console.log('dragItem', i, item, e);
    e.preventDefault();
}

const dragstartItem = (i: number, item: any, e: any) => {
    dragIndex.value = i;
}

const dragoverItem = (i: number, item: any, e: any) => {
    //console.log('leave', e)
    e.preventDefault();
}

const dragenterItem = (i: number, item: any, e: any) => {
    e.preventDefault();
    const ifEnterItem = e.target.classList.contains('links-item');
    if (ifEnterItem && i !== dragIndex.value ) {
        console.log(dragIndex.value, i)
        if (i >= dragIndex.value) {
            linkList.splice(i + 1, 0, linkList[dragIndex.value]);
            linkList.splice(dragIndex.value, 1);
        } else {
            linkList.splice(i, 0, linkList[dragIndex.value]);
            linkList.splice(dragIndex.value + 1, 1);
        }
        dragIndex.value = i;
    }
}

const dragendItem = () => {
}
</script>

<style scoped lang="less">
.quick-links-container-box {
    width: 100%;
    height: 100%;

    .quick-links-container {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 80px);
        grid-gap: 10px 10px;

        .links-item {
            width: 80px;
            height: 80px;
            border: 1px solid @color;
            border-radius: 8px;
            background-color: #FFFFFF;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 5px;
            user-select: none;
            cursor: move;
            overflow: hidden;
            transform: rotate(0deg);

            .title {
                display: inline-block;
                color: @highLightColor;
                margin: 5px 0;
                white-space: nowrap;
                font-weight: 700;
                width: 100%;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .svg-icon {
                // margin: 5px 0;
            }
        }
    }
}

.sort-move {
    transition: transform 0.3s;
    pointer-events: none;
}

</style>
