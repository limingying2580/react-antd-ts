import React, {Component,createRef,RefObject} from 'react';
import {FormInstance, Button, Checkbox, Form, Input, Space, message} from 'antd';
import '../static/css/login.css'
import {loginApi} from '../api/loginApi'
import {set} from "../utils/storage"


class Login extends Component {
    formRef:RefObject<FormInstance>

    constructor(props: any, context: any) {
        super(props,context);
        this.formRef = createRef<FormInstance>()
    }

    //方法一调用，没有用封装好的http请求
    // login = (form:any) => {
    //     loginApi(form.username,form.password).then(response=> {
    //         const {code,msg,data} = response.data
    //         if(code == 0) {
    //             set('token',data.token);
    //             window.location.href='/'
    //             // message.success(msg)
    //         } else {
    //             message.error(msg)
    //         }
    //     })
    // }

    //方法二调用，用封装好的http请求
    login = (from: any) => {
        let params = from
        loginApi(params).then(response=> {
            const {msg,data} = response.data
            if(response.status == 200) {
                set('token',data.token);
                message.success("登录成功");
                window.location.href='/'
            } else {
                message.error(msg)
            }
        })
    }

    onFinish = (values: any) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    render() {
        return (
            <>
                <div className='loginDiv'>
                    <Form
                        id='login-form'
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={this.login}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            className = 'userNameInput'
                            rules={[{ required: true, message: '请输入用户名！' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码！' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>记住帐号密码</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Space>{/*让组件直接产生空隙*/}
                                <Button type="primary" htmlType="submit">
                                    登录
                                </Button>
                                <Button type="primary" htmlType="reset">
                                    重置
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </>
        );
    }
}

export default Login;
