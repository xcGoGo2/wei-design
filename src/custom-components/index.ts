import WButton from './WButton/index.vue';

// @ts-ignore
const charts = import.meta.globEager('./Charts/*/*.vue');

let customComponents: {name: string; component: any}[] = [];
Object.values(charts).forEach((o: any) => {
    customComponents.push({
        name: 'W' + o.default.__name,
        component: o.default
    })
});

const other = [
    {
        name: 'WButton',
        component: WButton
    }
]

// 加入基础组件
export default [...customComponents, ...other];
