// Import vue component
import SketchRuler from './sketchRuler.vue';

// Declare install function executed by Vue.use()
export function install(Vue: any) {
    // @ts-ignore
    if (install.installed) return;
    // @ts-ignore
    install.installed = true;
    Vue.component(SketchRuler.name, SketchRuler);
}

// Create module definition for Vue.use()
const plugin = {
    install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
    // @ts-ignore
    GlobalVue = window.Vue;
}
if (GlobalVue) {
    GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default SketchRuler;