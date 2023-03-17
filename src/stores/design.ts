import { defineStore } from 'pinia'
import { DsignStateTypes } from './interface'
import { Compnents } from '@/type'
import { addDesign, findDesignList, getDesignContentById, updateDesignById } from '@/api/service/design'
import { getItem } from '@/utils'
import { dayjs } from 'element-plus'

export const useDesignStore = defineStore('design', {
    state: (): DsignStateTypes => {
        return {
            curComponentIndex: -1, // 当前选中组件
            canvasScale: 1,
            componentsInCanvas: [], // 当前界面中显示的组件数据
            editCanvasConfig: {},
            pageConfig: {
                // 页面设置数据
                title: '项目-' + dayjs(new Date()).format(), // 默认项目名称
                img: '平台', // 封面
                width: 1920,
                height: 1080,
                backgroundColor: '#f2f3f5',
                adapter: 'auto',
                theme: 'light',
                status: 'success',
            },
            designList: [],
        }
    },
    getters: {
        editConfigContent(): {
            pageConfig: any
            componentsInCanvas: Compnents[]
        } {
            return {
                pageConfig: this.pageConfig,
                componentsInCanvas: this.componentsInCanvas,
            }
        },
    },
    actions: {
        changeComponentsInCanvasByIndex(index: number | string, data: any) {
            this.componentsInCanvas[Number(index)] = data
        },
        setPageConfigByKey(key: string, value: any) {
            this.pageConfig[key] = value
        },
        addComponentsInCanvas(component: Compnents) {
            this.componentsInCanvas.push(component)
        },
        async newDesignContent() {
            const content = JSON.stringify(this.editConfigContent || {})
            const { id: userId } = getItem('loginContent') || ''

            const res = await addDesign(userId, content)
            return res
        },
        async getEditConfigContent(id: string) {
            const res = await getDesignContentById(id)
            if (res.status === 'success') {
                const { pageConfig, componentsInCanvas } = JSON.parse(res.data.content)
                this.pageConfig = pageConfig
                this.componentsInCanvas = componentsInCanvas
            }
            return res
        },
        async updateDesignById(id: string, content?: string) {
            content = content ? content : JSON.stringify(this.editConfigContent || {})
            const res = await updateDesignById(id, content)
            return res
        },
        async findDesignList() {
            const { id: userId } = getItem('loginContent') || ''
            const res = await findDesignList(userId)
            if (res.status === 'success') {
                this.designList = res.data.map((o: any) => {
                    return { ...JSON.parse(o.content || '{}').pageConfig, id: o.id }
                })
                return this.designList;
            };
            return [];
        },
    },
})

