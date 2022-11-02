/**
 * localStorage 存入
 * @param key key值 
 * @param value 存入值
 */
export const setItem = (key: string, value: any) => {
  if(value instanceof Object) {
    value = JSON.stringify(value);
  }else {
    value = String(value);
  };
  window.localStorage.setItem(key, value);
}

/**
 * localStorage 取出
 * @param key 获取存入localStorage值的key
 * @returns 存入值
 */
export const getItem = (key: string) => {
  if(!key) {
    return null
  };

  let value = window.localStorage.getItem(key);

  return value ? JSON.parse(value) : null;
}

/**
 * localStorage 删除
 * @param key 删除localStorage值的key
 */
 export const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
}

/**
 * 随机获取颜色
 * @param type 16进制颜色 或 rgb颜色
 * @returns 颜色值
 */
export const getRandomColor = (type?: string | number): string => {
  type = type ? type : '';
  if(type === 'rgb') {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`;
  }else {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    const color = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
    return color;
  }
  
}




