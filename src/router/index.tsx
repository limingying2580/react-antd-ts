import React, {ReactNode,lazy} from 'react';

const Login = lazy(() => import ('../pages/Login'))

//如果是js文件的话，就无视interface的定义
interface IRouter {
    title?: string,
    path: string,
    key: string,
    component?: ReactNode,
    children?: IRouter[]

}
//路由表的写法
/* const router: Array<IRouter> = [
     {
         path: '/',
         component: lazy(() => import("../pages/Login"))
     },
     {
         path: '/about',
         component: lazy(() => import("url"))
     }
 ]*/
const router: IRouter[] = [
    {
        path: '/',
        title: '',
        key:'/',
        component: <Login/>
    },
    {
        path: '/login',
        title: '登录',
        key:'/login',
        component: <Login/>
    }
]
export default router
