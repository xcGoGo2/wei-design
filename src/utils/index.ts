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




