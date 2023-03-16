<template>
    <div class="popper-menu-container">
        <div class="menu-content">
            <!-- 菜单展示圆 -->
            <div class="menu-show-content" :class="[isActive? 'active': '']" @mouseenter="mouseenterContent" @mouseleave="mouseleaveContent" @click="selectContent">
                <div class="content">
                    <slot name="content">
                        菜单
                    </slot>
                </div>
            </div>
            <!-- 菜单 -->
            <div class="menu-item" :style="menuItemStyle[i]" v-for="(item, i) in menuList" @click="selectMenuItem(item)" :class="item.display === 'none'?'hide': ''" :key="item.title + i">
                <span>{{ item.title }}</span>
                <svg-icon :name="item.icon" color="#FFF"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { emit } from "process";
import { defineProps, ref, computed, PropType, defineEmits } from "vue";

const props = defineProps({
    size: {
        type: [String, Number],
        default: 80
    },
    menuList: {
        type: Array as PropType<any[]>,
        validator(list: any[]) {
            return list.length <= 6
        },
        default: () => {
            return [
            {
                    title: 'menu1',
                    icon: '发布'
                }
            ]
        }
    },
    position: {
        validator(value: string) {
            // The value must match one of these strings
            return ['tl', 'bl', 'tr', 'br'].includes(value)
        },
        default: 'tr'
    }
})

const emits = defineEmits(['selectMenuItem']);


// 每个元素的移动位置

let r = ref(0);  // 菜单半径
let opacity = ref(0);
r.value = typeof props.size === 'number' ? props.size : parseInt(props.size); // 半径


// 圆 方程
function getcycle(x: number, r: number) {
    return Math.sqrt(r * r - x * x)
}


let deg = 90 / (props.menuList.length);  // 角度

const menuItemStyle = computed(() => {
    return props.menuList.map((o: any, i: number) => {

        // 每一行最多放 行数 * 6
        const degs = deg * i + (45 / props.menuList.length); // 角度
        const sinDeg = Math.abs(Math.sin(degs * (Math.PI / 180))); // sin 值
        const y = getcycle(sinDeg * r.value, r.value + 20);
        return {
            transform: `translate(-${y}px, ${sinDeg * r.value}px)`,
            opacity: opacity.value
        }

    })
})

const isActive = ref(false); // 当前选中放大菜单

const mouseenterContent = () => {
    r.value = Number(props.size) * 1.8;
    opacity.value = 1;
}

const mouseleaveContent = () => {
    // 当前选中菜单后菜单 item 不消失
    if(isActive.value) {
        return
    }
    r.value = Number(props.size) / 1.8;
    opacity.value = 0;
}

const shrinkPropMenu = () => {
    isActive.value = false;
    r.value = Number(props.size) / 1.8;
    opacity.value = 0;
}

const selectContent = (e: MouseEvent) => {
    isActive.value = true;
    r.value = Number(props.size) * 1.8;
    opacity.value = 1;

    window.document.addEventListener('click', shrinkPropMenu);

    // 阻止向父组件冒泡
    e.stopPropagation();
    e.preventDefault();
}



// 弹出菜单样式

const properStyle = computed(() => {
    const size = (typeof props.size === 'number' ? props.size : parseInt(props.size)) * 2;
    return {
        size: `${size}px`,
        positionSize: `-${size / 2}px`
    }
})

const contentStyle = computed(() => {
    const size = -(typeof props.size === 'number' ? props.size : parseInt(props.size));
    let top = `${size}px`;
    let bottom = `${size}px`;
    let left = `${size}px`;
    let right = `${size}px`;
    // 左边
    if(props.position.includes('l')) {
        right = 'auto'
    }else {
        left = 'auto'
    }
    if(props.position.includes('t')) {
        bottom = 'auto'
    }else {
        top = 'auto'
    }
    return {
        top,
        bottom,
        right,
        left
    }
})

const selectMenuItem = (item: any) => {
    emits('selectMenuItem', item)
}

</script>

<style lang="scss" scoped>
.popper-menu-container {
    position: absolute;
    height: v-bind("properStyle.size");
    width: v-bind('properStyle.size');
    top: 0;
    right: 0;
    overflow: hidden;

    .menu-content {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        height: v-bind("properStyle.size");
        width: v-bind('properStyle.size');
        top: v-bind("contentStyle.top");
        right: v-bind("contentStyle.right");
        bottom: v-bind("contentStyle.bottom");
        left: v-bind("contentStyle.left");

        .menu-show-content {
            position: absolute;
            height: v-bind("properStyle.size");
            width: v-bind('properStyle.size');
            background-color: #fff;
            outline: gray 1px solid;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.25s;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;

            &:hover {
                transform: scale(1.5);
            }

            &.active {
                transform: scale(1.5);
            }

            .content {
                position: absolute;
                bottom: 25%;
                left: 25%;
            }

        }

        .menu-item {
            position: absolute;
            height: 50px;
            width: 50px;
            // border: 1px saddlebrown solid;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transform-origin: center center;
            transition: all .25s;
            cursor: pointer;
            border-radius: 50%;
            color: #fff;
            background-color: $activeColor-1;

            &.hide {
                display: none;
            }
        }
    }
}
</style>

