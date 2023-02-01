import { reactive } from 'vue';

export const useMouseXY = (elem?: any, event?: any) => {
    //
    elem = elem ? elem : window.document;
    event = event ? event : window.event;
    const x = event.offsetX;
    const y = event.offsetY;
    return { elem, event, x, y }; // 方法返回宽高值
};
