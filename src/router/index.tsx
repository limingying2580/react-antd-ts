import React, {ReactNode,lazy} from 'react';

const Login = lazy(() => import ('../pages/Login'))

interface IRouter {
    title: string,
    path: string,
    key: string,
    component?: ReactNode,
    children?: IRouter[]

}
const router: IRouter[] = [
    {
        path: '/login',
        title: '登录',
        key:'/login',
        component: <Login/>
    }
]
export default router
