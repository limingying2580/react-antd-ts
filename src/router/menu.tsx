import React, {ReactNode,lazy} from 'react';

interface IRouter {
    title?: any,
    path: any,
    key: any,
    component?: ReactNode,
    children?: IRouter[]

}

const menuRouter: IRouter[] = [
    {
        path: '/user',
        title: '用户管理',
        key:'/user',
        /* component: <User/>*/
        children: [
            {
                path: '/userList',
                title: '用户列表',
                key:'/userList'
            },
            {
                path: '/adduser',
                title: '增加列表',
                key:'/adduser'
            }
        ]
    }

]
export default menuRouter
