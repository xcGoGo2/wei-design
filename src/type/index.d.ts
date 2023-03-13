export interface menuListType {
    title: string
    icon: string
    router: string
    children?: menuListType[]
}

export type tagType = {
    title: any
    path: string
    type: string
}

export type reponseType = {
    code: number;
    status: string;
    message: string;
    data: any | menuListType[]
}

export interface userInfoType {
    username: string
    avator: string
}

export interface stateType {
    componentsList: Compnents[]
    count: Number
    loginContent: {
        [propName: string]: any
    }
    menuList: menuListType[]
    curComponentIndex: number
    canvasScale: number
}

export interface assemblyType {
    img: string
    title: string
    content: string
    time: string
}

export type Compnents = {
    id: string
    type: string; // 组件类性
    component: string // 组件名称，需要提前注册到 Vue
    label: string // 左侧组件列表中显示的名字
    propValue: string // 组件所使用的值
    icon: string // 左侧组件列表中显示的名字
    animations: Array<any> // 动画列表
    events: any // 事件列表
    style: any;
    ifLock?: boolean;
    ifShow?: boolean;
    title?: string;
    [key: string]: any
}
