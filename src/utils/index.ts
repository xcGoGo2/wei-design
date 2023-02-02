/**
 * localStorage 存入
 * @param key key值
 * @param value 存入值
 */
import FunnelView from 'echarts/types/src/chart/funnel/FunnelView'

export const setItem = (key: string, value: any) => {
    if (value instanceof Object) {
        value = JSON.stringify(value)
    } else {
        value = String(value)
    }
    window.localStorage.setItem(key, value)
}

/**
 * localStorage 取出
 * @param key 获取存入localStorage值的key
 * @returns 存入值
 */
export const getItem = (key: string) => {
    if (!key) {
        return null
    }

    let value = window.localStorage.getItem(key)

    return value ? JSON.parse(value) : null
}

/**
 * localStorage 删除
 * @param key 删除localStorage值的key
 */
export const removeItem = (key: string) => {
    window.localStorage.removeItem(key)
}

/**
 * 随机获取颜色
 * @param type 16进制颜色 或 rgb颜色
 * @returns 颜色值
 */
export const getRandomColor = (type?: string | number): string => {
    type = type ? type : ''
    if (type === 'rgb') {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        return `rgb(${r},${g},${b})`
    } else {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
        return color
    }
}

/**
 * 返回随机且不重复的 key 值
 */
export const getRandomKey = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * uuid
 * @param len 长度
 * @param radix 基数
 * @returns
 */
export const  uuid = (len?: number, radix?: number) => {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data.  At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}

/**
 * 防抖函数：n 秒后在执行该事件，若在 n 秒内被重复触发，则重新计时
 * @param func 函数
 * @param wait 等待时间
 * @param immediate 是否立即执行
 */
export function debounce(func: Function, wait: number, immediate?: boolean) {
    let timeout: any

    return function () {
        let context = this
        let args = arguments

        if (timeout) clearTimeout(timeout) // timeout 不为null
        if (immediate) {
            let callNow = !timeout // 第一次会立即执行，以后只有事件执行后才会再次触发
            timeout = setTimeout(function () {
                timeout = null
            }, wait)
            if (callNow) {
                func.apply(context, args)
            }
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait)
        }
    }
}

/**
 * 函数节流：n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效
 * @param func 函数
 * @param wait 等待时间
 */

export function throttle(func: any, wait: number) {
    var timer: any = null;
    var startTime = Date.now();

    return function(){
        var curTime = Date.now();
        var remaining = wait-(curTime-startTime);
        var context = this;
        var args = arguments;

        clearTimeout(timer);

        if(remaining<=0){
            func.apply(context, args);

            startTime = Date.now();

        }else{
            timer = setTimeout(func, remaining);  // 如果小于wait 保证在差值时间后执行
        }
    }
}


export function deepCopy (data: any) {
    // 匹配函数
    function metaType (obj: any) {
        const MAP = {
            '[object String]': 'string',
            '[object Number]': 'number',
            '[object Boolean]': 'boolean',
            '[object Null]': 'null',
            '[object Undefined]': 'undefined',
            '[object Symbol]': 'symbol',
            '[object BigInt]': 'bigInt',
            '[object Object]': 'object',
            '[object Function]': 'function',
            '[object Array]': 'array',
            '[object Date]': 'date',
            '[object RegExp]': 'regExp',
            '[object Error]': 'error'
        };

        // @ts-ignore
        return MAP[Object.prototype.toString.call(obj)];
    }

    const type = metaType(data);
    let obj: any = null;
    if (type === 'array') {
        obj = [];
        for (let i = 0; i < data.length; i++) {
            obj.push(deepCopy(data[i]));
        }
    } else if (type === 'object') {
        obj = {};
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                obj[key] = deepCopy(data[key]);
            }
        }
    } else {
        return data;
    }
    return obj;
}
