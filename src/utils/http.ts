// 导入封装好的axios实例
//实现对http请求的封装
/*
import http from '@/utils/http'
//
let resquest = "/api/assess/detail"  定义一个可以作为拼接使用

// get请求
export function functionName(params){
    return http.get(url,params)
    return http.delete(`${resquest}/deleteList.json`,params)

}
 */
import service from './request'

let config={
    headers: {
        'Content-Type': 'application/json'
    }
}

const http ={
    /**
     * methods: 请求
     * @param url 请求地址
     * @param params 请求参数
     */
    get(url: any,params?: any){
        const config: any = {
            method: 'get',
            url: url,
        }
        if(params) config.params = params
        return service(config)
    },
    post(url: any,params: any){
        const config: any = {
            method: 'post',
            url: url,
        }
        if(params) config.data = params
        return service(config)
    },
    postFile(url: any,params: any){
        const config: any = {
            method: 'post',
            url: url,
        }
        if(params) config.data = params
        return service(config)
    },
    upPic(url: any,params: any){
        const config: any = {
            method: 'post',
            // url: 'https://files.ondemandcn.net/pic/ups',
        }
        if(params) config.data = params
        return service(config)
    },
}
//导出
export default http
