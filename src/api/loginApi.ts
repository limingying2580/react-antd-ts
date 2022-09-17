import request from '../utils/request'
import http from "../utils/http";

//方法一调用，没有用封装好的http请求
//这边调用可以直接用http中二次封装好的方法，简单
// export const loginApi = (name: string, password: string) => {
//     return request({
//         url:' /api1/admin/login',
//         method: 'post',
//         data: `username=${name}&password=${password}`
//         //由于下面这种方法axios将data数据转成json，会导致请求错误
//         // data: {
//         //     name: name,
//         //     password: password
//         // }
//     })
// }

//方法二调用，用封装好的http请求
export function loginApi(params: any){
    return http.post('/api1/admin/login',params)
}
