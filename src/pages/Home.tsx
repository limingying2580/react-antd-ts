import React, {Component, useState} from 'react';
import { Layout, Menu, Button} from 'antd';
import type { MenuProps } from 'antd';
import {clear} from "../utils/storage"
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    LaptopOutlined,
    NotificationOutlined
} from '@ant-design/icons';
import "../static/css/home.css"
const { Header, Sider, Footer, Content } = Layout;


class Home extends Component {
    layout = () => {
        clear();
        window.location.href='/'
    }
    state = {
        collapsed: false,
    };

    setCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
        (icon, index) => {
            const key = String(index + 1);

            return {
                key: `sub${key}`,
                icon: React.createElement(icon),
                label: `subnav ${key}`,

                children: new Array(4).fill(null).map((_, j) => {
                    const subKey = index * 4 + j + 1;
                    return {
                        key: subKey,
                        label: `option${subKey}`,
                    };
                }),
            };
        },
    );
    render() {
        return (
            <>
                <Layout className="page">
                   {/* <Header className="header">react-ts-antd-manager</Header>*/}
                    <Layout>
                        <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
                            <div className="logo">
                                <div className="logoPic"></div>
                            </div>
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['2']}
                                items={this.items2}
                            />
                        </Sider>
                        <Layout className="site-layout">
                            <Header className="site-layout-background" style={{ padding: 0 }}>
                                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: () => this.setCollapsed(),
                                })}
                               <span className="managerName">react-ts-antd-manager</span>
                                <Button type="primary" style={{marginTop:"7px"}} onClick={this.layout}>退出</Button>
                            </Header>
                            <Content
                                className="site-layout-background"
                                style={{
                                    margin: '24px 16px 0 16px',
                                    padding: 24,
                                    minHeight: 280,
                                }}
                            >
                                Content
                            </Content>
                        </Layout>
                    </Layout>
                    <Footer className="footer">create by @limingying</Footer>
                </Layout>
            </>
        );
    }
}

export default Home;
