import React, {ReactNode,lazy} from 'react';
// import Home from "../pages/Home";

const Login = lazy(() => import ('../pages/Login'));
const Page404 = lazy(() => import ('../pages/Page404'));
const Home = lazy(() => import ('../components/Home'));
const Dashboard = lazy(() => import('../components/Dashboard'))
const Users = lazy(() => import('../components/Users'))


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
        path: '/dashboard',
        title: '仪表盘',
        key:'/dashboard',
        component: <Dashboard/>,
    },
    {
        path: '/home',
        title: '首页',
        key:'/home',
        component: <Home/>,
    },
    {
        path: '/users',
        title: '用户',
        key:'/users',
        component: <Users/>,
    }
]
export default router

export const unRouter: IRouter[] = [
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
    },
    {
        path: '*',
        title: '404',
        key:'404',
        component: <Page404/>
    }
]
