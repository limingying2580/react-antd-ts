//要学习一下请求拦截器
import axios from 'axios'
import {message,Modal} from 'antd'
import Nprogress from 'nprogress'
import {clear, get} from './storage'
import {Router, Route} from "react-router-dom"

//1. 创建新的axios实例，
const service = axios.create({
    baseURL: process.env.REACT_APP_API,
    // 超时时间 单位是ms，
    timeout: 5000,
    // headers： {
    // ...newParams
    // }
})
// 2.请求拦截器
service.interceptors.request.use(
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
    //  config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
    // config.headers = {
    //   'Content-Type':'application/json' //配置请求头
    // }
//注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
//    const token = getCookie('名称');//这里取token之前，你肯定需要先拿到token,存一下
//    if(token){
//       config.params = {'token':token} //如果要求携带在参数中
//       config.headers.token= token; //如果要求携带在请求头中
//     }
//   console.log(config)
    config => {
        Nprogress.start();
        // @ts-ignore
        config.headers['Authorization'] = get('token');
        // config.headers['Authorization'] = localStorage.getItem('token');
        return config
    },
    error => {
        Nprogress.done();
        return Promise.reject(error)
    }
)
// 3.响应拦截器
service.interceptors.response.use(
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    response => {
        Nprogress.done();
        if(response.status === 200) {
            const {data} = response.data;
            //本次接口中没有data.code,会报错，注释，根据实际接口来
            // const code = data.code;
            // if (code === -1) {
            //     // -1 token过期 回到登录页面，结合路由使用
            //     // Router.push({path: '/loginApi'})
            // } else if (code === 1) {
            //     //  1 成功
            //     return response
            // } else {
            //     //  0 失败
            //     // 直接弹出提示框
            //     return response
            // }
            //登录的接口中data返回的是token，所以下面判断也不会走
            if(data === 4003) {
                message.warning('您的登录状态已经丢失，请退出后重新登录');
                return Promise.reject('请登录');
            } else if(data === 4000) {
                // localStorage.clear();
                clear();
                return Promise.reject('认证失败');
            }
            return  response;
        } else {
            Modal.error({
                title: '网络请求错误'
            });
            return Promise.reject('网络请求错误')
        }
    },
    error => {
        if (error && error.response) {
            // 1.公共错误处理
            // 2.根据响应码具体处理
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求'
                    break;
                case 401:
                    error.message = '未授权，请重新登录'
                    break;
                case 403:
                    error.message = '拒绝访问'
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源'
                    // window.location.href = "/loginApi"
                    break;
                case 405:
                    error.message = '请求方法未允许'
                    break;
                case 408:
                    error.message = '请求超时'
                    break;
                case 500:
                    error.message = '服务器端出错'
                    break;
                case 501:
                    error.message = '网络未实现'
                    break;
                case 502:
                    error.message = '网络错误'
                    break;
                case 503:
                    error.message = '服务不可用'
                    break;
                case 504:
                    error.message = '网络超时'
                    break;
                case 505:
                    error.message = 'http版本不支持该请求'
                    break;
                default:
                    error.message = `连接错误${error.response.status}`
            }
        } else {
            // 超时处理
            // if (JSON.stringify(error).includes('timeout')) {
            //   Message.error('服务器响应超时，请刷新当前页')
            // }
            message.error('请求超时，连接服务器失败')
        }
        Modal.error({title: error.message});
        Nprogress.done();
        return Promise.reject(error)
    }
)
export default service
