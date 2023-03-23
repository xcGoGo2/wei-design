import html2canvas from "html2canvas";
import { ref } from "vue";

export const useHtml2canvas = async (dom: HTMLElement, option: object): Promise<string> => {
    const dom2imageRef = dom;

    const options: any = Object.assign({
        useCORS: true,// 开启跨域
        backgroundColor: "transparent",// 背景色
        ignoreElements: (ele: any) => {},// dom节点
        scale: 10,// 渲染出来的比例
    }, option);

    const canvas = await html2canvas(dom2imageRef, options);
    return canvas.toDataURL("image/jpeg", 0.05); // canvas转png（base64）

}
