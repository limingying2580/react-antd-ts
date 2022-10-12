/*
随着HTML5规范的普及，我们不再用cookie来实现记住密码，通常会用的LocalStorage及本地缓存。
 对于Cookie来说它只有一个document.cookie这一个API可以使用,不管是读取Cookie还是存储Cookie你都只能使用它
然而LocalStorage{
你存储的时候有localStorage.setItem()
你读取的时候有localStorage.getItem()
你想要删除的时候有localStorage.removeItem()
此外在存储时,它们事以键值对的形式存储的.所以更易于使用.并且localStorge的储存空间大，有5M,并且是永久储存，除非你主动删除。
*/

export const remove = (key: string) => {
    localStorage.removeItem(key)
}

export const get = (key: string) => {
    localStorage.getItem(key)
}

/**
 * 引用类型，包括 Object 和 Array
 * localStorage.setItem(key, JSON.stringify(value))
 *
 * 基本类型直接存储
 * 注意如果不是 string 类型，则会调用 toString 方法尝试转为 string
 * localStorage.setItem(key, value)
 */
export const set = (key: string,val: string) => {
    localStorage.setItem(key,val)
}
export const clear = () => {
    localStorage.clear()
}
