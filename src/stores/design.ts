import { defineStore } from 'pinia';
import { DsignStateTypes } from './interface'
import { Compnents } from '@/type';

export const useDesignStore = defineStore('design', {
    state: (): DsignStateTypes => {
        return {
            curComponentIndex: -1, // 当前选中组件
            canvasScale: 1,
            componentsInCanvas: [], // 当前界面中显示的组件数据
            editCanvasConfig: {},
            pageConfig: {  // 页面设置数据
                title: '新建项目',
                width: 1920,
                height: 1080,
                backgroundColor: '#f2f3f5',
                adapter: 'auto',
                theme: 'light'
            }
        }
    },
    getters: {
        editConfigContent(): {
            pageConfig: any;
            componentsInCanvas: Compnents[]
        } {
            return {
                pageConfig: this.pageConfig,
                componentsInCanvas: this.componentsInCanvas
            }
        }
    },
    actions: {
        changeComponentsInCanvasByIndex(index: number | string, data: any) {
            this.componentsInCanvas[Number(index)] = data
        },
        setPageConfigByKey(key: string, value: any) {
            this.pageConfig[key] = value;
        },
        addComponentsInCanvas(component: Compnents) {
            this.componentsInCanvas.push(component);
        }
    }
})
