export const remove = (key: string) => {
    localStorage.removeItem(key)
}
// @ts-ignore
export const get = (key: string): string | null => {
    localStorage.getItem(key)
}
export const set = (key: string,val: string) => {
    localStorage.setItem(key,val)
}
export const clear = () => {
    localStorage.clear()
}
