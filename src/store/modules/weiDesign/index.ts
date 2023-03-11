import { Module } from 'vuex';
import { WeiDesignStateTypes } from './interface'
import { RootStateTypes } from '@/store/interface'
import { Compnents } from '@/type'
import { myDesign } from '@/api/service'

const weiDesignModule: Module<WeiDesignStateTypes, RootStateTypes> = {
    namespaced: true,
    state: () => ({
        componentsList: [],
        curComponentIndex: -1, // 当前选中组件
        canvasScale: 1,
        componentsInCanvas: [], // 当前界面中显示的组件数据
        editCanvasConfig: {},
        pageConfig: {
            width: 1920,
            height: 1080,
            backgroundColor: '#f2f3f5',
            adapter: 'auto',
            theme: 'light'
        }
    }),
    mutations: {
        setComponentsList(state: WeiDesignStateTypes, data: Compnents[]) {
            state.componentsList = data;
        },
        setComponentIndex(state: WeiDesignStateTypes, data: number) {
            state.curComponentIndex = data;
        },
        setCanvasScale(state: WeiDesignStateTypes, data: number) {
            state.canvasScale = data;
        },
        setComponentsInCanvas(state: WeiDesignStateTypes, data: Compnents[]) {
            state.componentsInCanvas = data;
        },
        addComponentsInCanvas(state: WeiDesignStateTypes, data: Compnents) {
            state.componentsInCanvas = [...state.componentsInCanvas, data];
        },
        changeComponentsInCanvasByIndex(state: WeiDesignStateTypes, data: { index: number; component: Compnents[] }) {
            state.componentsInCanvas[data.index] = data.component;
        },
        setPageConfig(state: WeiDesignStateTypes, data) {
            state.pageConfig = data;
        },
        setPageConfigByKey(state: WeiDesignStateTypes, { key, value }) {
            state.pageConfig[key] = value;
        }
    },
    getters: {

    },
    actions: {
        async fetchComponentsList(context) {
            const res = await myDesign.fetchComponentsList();
            context.commit('setComponentsList', res.data);
        },
    }
}

export default weiDesignModule;
