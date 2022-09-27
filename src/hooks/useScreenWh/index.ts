import { reactive } from 'vue';

export const useScreenWH = () => {
    // 创建一个对象，保存宽度和高度值
    const screen = reactive({
        width: 0,
        height: 0,
    });

    // 创建一个方法，获取可视化界面的宽度和高度值
    const getWH = () => {
        screen.width = document.documentElement.clientWidth;
        screen.height = document.documentElement.clientHeight;
    };

    return { screen, getWH }; // 方法返回宽高值
};
