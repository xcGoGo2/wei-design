import { reactive } from 'vue';

export const useElementScale = (element: HTMLElement) => {
    element = element? element : document.documentElement;
    // 创建一个对象，保存宽度和高度值
    const clientHeight: number = element.clientHeight;
    const clientWidth: number = element.clientWidth;
    // 比例 width / height
    const scale: number = clientWidth / clientHeight;

    // 创建监听元素尺寸变化
    const resizeObserver = new ResizeObserver((arr) => {

    });

    resizeObserver.observe(element);

    return {
        resizeObserver,
        scale
    }
};
