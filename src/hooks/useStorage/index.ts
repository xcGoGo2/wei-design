/**
 * @description 对sessionStorage、localStorage的封装,localStorage默认一直保存数据,seesionStorage关闭标签页或窗口立即清除数据
 * @class SStroage
 * @example
 * var session=new SStorage('session','aaasss');
 * session.set('da',{a:1,b:2});
 * session.get('da');
 * session.remove('da');
 */

export function useStorage(param: string, pre?: string) {
    let type = localStorage
    const prefix = pre || ''
    if (param == 'session' || param == 'sessionStorage') {
        type = sessionStorage
    }
    const length = type.length //storage的长度

     /**
   * @function 设置缓存数据,思路：封装成一个json数据存进去，保存多长时间、过期时间、保存的数据
   * @method SStorage.set(name) 调用的是localStorage.setItem(name)或者sessionStorage.setItem(name)
   * @param {string} name  保存数据的key值,必填
   * @param {any} [value='']   需要保存的数据
   * @param {number} [time=0]   过期时间,以毫秒为单位,默认永不过期
   * @example SStorage.set("aa","123456",5000)
   */
    function set(name: string, value = '', time = 0) {
        time = isNaN(time - 0) ? 0 : time - 0 //转换成数字,字符串类型的数字也转成数字
        time = time > 0 ? time : 0 //有负数的情况
        let obj: any = {}
        obj[prefix + 'value'] = value
        obj[prefix + 'time'] = time
        obj[prefix + 'startTime'] = new Date().getTime() //记录何时将值存入缓存，毫秒级

        if (name) {
            type.setItem(name, JSON.stringify(obj))
        } else {
            console.log('请先设置name名')
        }
    }

    /**
   * @function 获取缓存数据
   * @method SStorage.get(name) 调用的是localStorage.getItem(name)或者sessionStorage.getItem(name)
   * @param {string} name  保存数据的key值,必填
   * @example
   * SStorage.get("aa")
   */
    function get(name: string) {
        let item: any = type.getItem(name)
        if (item) {
            //先尝试进行json字符串转为对象,可能有直接存储字符串的情况
            try {
                item = JSON.parse(item)
            } catch (error) {
                //如果不行就不是json的字符串，就直接返回
                item = item
            }

            //  判断有没有设置过期时间、保存数据的格式
            //先判断设置时的时间大于0，是否为数字,过期时间是否也为数字
            if (item[prefix + 'startTime'] > 0 && !isNaN(item[prefix + 'startTime']) && !isNaN(item[prefix + 'time'])) {
                let date = new Date().getTime() //获取当前时间
                if (item[prefix + 'time'] == 0) {
                    //等于0永不过期
                    return item[prefix + 'value']
                } else if (item[prefix + 'time'] + item[prefix + 'startTime'] > date) {
                    //开始时间+保存时间如果大于当前时间,（未过期）就返回值，否则清空
                    return item[prefix + 'value']
                } else {
                    localStorage.removeItem(name)
                    return null
                }
            } else {
                //如果没有设置失效时间，直接返回值
                return item
            }
        } else {
            return null
        }
    }

    /**
     * @function 清除缓存
     * @method SStorage.remove(name) 调用removeItem(name)或是clear()
     * @param {string} [name]  保存数据的key值,不填清空所有缓存
     * @example SStorage.remove("aa")
     */
    function remove(name: string) {
        if (name) {
            //有参数清除单条数据
            type.removeItem(name)
        } else {
            //无参数清除所有缓存数据
            type.clear()
        }
    }

    /**
     * @function 获取对应键名(下标)
     * @param {number} num 一个整数，表示要获取的键名索引
     * @returns 键名(下标)
     */
    function key(num: number) {
        num = isNaN(num - 0) ? -1 : num - 0 //转换成数字,字符串类型的数字也转成数字，同时取整
        if (num >= 0) {
            return type.key(num)
        } else {
            return null
        }
    }

    return {
        set,
        get,
        remove,
        key,
    }
}

