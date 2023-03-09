import { Compnents } from '@/type'

const TYPE_MAPS = new Map([
    ['chart', '图像'],
    ['element', '普通元素'],
]);

/**
 * 返回组件的类性
 * @param componentData 组件数据
 * @returns ['element', '图像'] ...
 */
export const getComponentType = (componentData: Compnents): [string, string] => {
    const type = componentData['type'] || 'element';
    return [type, TYPE_MAPS.get(type) || '普通元素']
}

