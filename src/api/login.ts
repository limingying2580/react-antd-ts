import request from '../utils/request'

//这边调用可以直接用http中二次封装好的方法，简单
export const login = (name: string, password: string) => {
    return request({
        url:' /admin/login',
        method: 'post',
        data: {
            name: name,
            password: password
        }
    })
}
