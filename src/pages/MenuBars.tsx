import React, {Component, ReactNode} from 'react';
import {Button, Layout, Menu} from 'antd';
import {clear} from "../utils/storage";
import menuData from '../jsonText/menu.json'
import type { MenuProps } from 'antd';
import * as Icon from '@ant-design/icons';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import "../static/css/home.css"
import {Link} from 'react-router-dom'
import axios from 'axios'
import login from "./Login";

const {Header, Sider, Footer, Content} = Layout;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

interface Props {
    children: React.ReactNode
}
class MenuBars extends Component<Props>{

    layout = () => {
        clear();
        window.location.href = '/'
    }
    state = {
        collapsed: false,
        menuList: []
    };

    setCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    iconBC = (name?: string | undefined) => {
        // @ts-ignore
        return React.createElement(Icon[name]);
    }

    /**
     * 生成左侧导航栏的第一种方法，其中icon不要有</>
     * 这种方法可以生成并显示图标，路由在其中添加a标签
     * 这种写法推荐使用的antd 5.x版本中
     */
    /*
    1.componentDidMount 是在组件完全挂载后才会执行，在此方法中调用setState 会触发重新渲染
    2.constructor 调用是在一开始，组件未挂载，所以不能用。
    3.componentWillMount 调用在 constructor 后，在这里的代码调用 setState 不会出发重新渲染
    4.在 componentWillMount 里进行网络请求会阻碍组件的渲染。
    */
    componentDidMount() {
        console.log("直接引入的方式 menuData",menuData); //输出对象
        console.log("直接引入的方式menuData类型",typeof(menuData))
        console.log("直接引入的方式menuData类型",Object.prototype.toString.call(menuData))
        axios.get('/menuList.json').then(
            response => {
                const menuD: any= response.data;
                console.log("resopnse menuD数据",menuD) //输出对象
                console.log("resopnse menuD数据类型",typeof(menuD))
                console.log("resopnse menuD数据类型",Object.prototype.toString.call(menuD))
                this.setState({
                        menuList:menuD
                    },
                    ()=>{
                        console.log("通过axios获取的方式 menuList",this.state.menuList) //输出对象
                        console.log("通过axios获取的方式 menuList数据类型",typeof(this.state.menuList))
                        console.log("通过axios获取的方式 menuList数据类型",Object.prototype.toString.call(this.state.menuList))
                    })
            })
    }
    items2: MenuProps['items'] = menuData.map(
        (item: any) => {
            return {
                key: item.key,
                icon: this.iconBC(item.icon),
                label:
                    (
                        <a href={item.path} >
                            {
                                item.title
                            }
                        </a>
                    ),

                children:
                    item.children ? new Array(item.children?.length).fill(null).map((_, j) => {
                        return {
                            key: item.children[j].key,
                            icon: this.iconBC(item.children[j].icon),
                            // label: item.children[j].title,
                            label:
                                <a href={item.children[j].path} >
                                    {
                                        item.children[j].title
                                    }
                                </a>
                        };
                    }) : "",
            };
        }
    );

    /**
     * 生成左侧导航栏的第二种方法，这种解决的路由跳转的问题
     * 其中icon不要有</>
     * 使用到componentWillMount，表示组件将要挂载的时候调用，在render之前
     * 新的生命周期不用componentWillMount了，改成了componentDidMount
     */
    /*  componentWillMount() {
        /!*  const menuList: any = this.renderMenu(menuData);
          console.log(menuList);
          this.setState({
              menuList
          })*!/

          //通过axios拿数据，这样会有一些报错
          axios.get('/menuList.json').then(
              response => {
                  console.log("成功，", response.data);

                  let menuD = response.data;
                  const menuList: any = this.renderMenu(menuD);
                  this.setState({
                      menuList
                  })
          })
      }
      componentWillUnMount() {

      }

      //使用递归
      renderMenu = (data: any) => {
          return data.map((item: any) => {
              if (item.children) {
                  return (
                      <SubMenu key={item.key} title={item.title} icon={this.iconBC(item.icon)}>
                          {this.renderMenu(item.children)}
                      </SubMenu>
                  )
              } else {
                  return (
                      <MenuItem key={item.key} title={item.title} icon={this.iconBC(item.icon)}>
                          <Link to={item.path}>
                              {item.title}
                          </Link>
                      </MenuItem>
                  )
              }
          })
      };*/

    /**
     * 生成左侧导航栏的第三种方法，这种解决的路由跳转的问题
     * 其中icon不要有</>
     */
    /*    getMenuNodes = (menuList: any) => {
            console.log(menuList)
            return (
                menuList.map((item: any) => {
                    if (!item.children) {
                        return (
                            <Menu.Item key={item.key} icon={this.iconBC(item.icon)}>
                                <Link to={item.key}>
                                    {item.title}
                                </Link>
                            </Menu.Item>
                        )
                    } else {
                        return (
                            <SubMenu key={item.key} icon={this.iconBC(item.icon)} title={item.title}>
                                {this.getMenuNodes(item.children)}
                            </SubMenu>
                        )
                    }
                })
            )
        }*/

    /**
     * 生成左侧导航栏的第四种方法
     * 进一步模拟接口获取方式，通过axios拿数据
     * 可以在api中进行封装，但是目前没有后端接口，暂时这样处理
     */
    /*getMenuByAxios = () => {
        return (
            <>
                {
                    axios.get('/menuList.json').then(
                        response => {
                            console.log("成功，", response.data);

                            let menuD = response.data;
                            menuD.map((item: any) => {
                                if (!item.children) {
                                    return (
                                        <Menu.Item key={item.key} icon={this.iconBC(item.icon)}>
                                            <Link to={item.key}>
                                                {item.title}
                                            </Link>
                                        </Menu.Item>
                                    )
                                } else {
                                    return (
                                        <SubMenu key={item.key} icon={this.iconBC(item.icon)} title={item.title}>
                                            {this.getMenuNodes(item.children)}
                                        </SubMenu>
                                    )
                                }
                            })
                        },
                        error => {
                            console.log("菜单列表获取失败", error)
                        }
                    )
                }
            </>
        )
    }
*/
    render() {
        return (
            <>
                <Layout className="page">
                    {/* <Header className="header">react-ts-antd-manager</Header>*/}
                    <Layout>
                        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                            <div className="logo">
                                <div className="logoPic"></div>
                            </div>
                            <Menu
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={['2']}
                                items={this.items2}
                            ></Menu>

                            {/* <Menu
                                mode="inline"
                                theme="dark">
                                {this.state.menuList}
                            </Menu>*/}

                            {/* <Menu
                                mode="inline"
                                theme="dark"
                            >
                                {this.getMenuNodes(menuData)}
                            </Menu>*/}

                            {/*   <Menu
                                mode="inline"
                                theme="dark"
                            >
                                 {this.getMenuByAxios()}
                            </Menu>*/}

                        </Sider>
                        <Layout className="site-layout">
                            <Header className="site-layout-background" style={{padding: 0}}>
                                {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                    className: 'trigger',
                                    onClick: () => this.setCollapsed(),
                                })}
                                <span className="managerName">react-ts-antd-manager</span>
                                <Button type="primary" style={{marginTop: "7px"}} onClick={this.layout}>退出</Button>
                            </Header>
                            <Content
                                className="site-layout-background"
                                style={{
                                    margin: '24px 16px 0 16px',
                                    padding: 24,
                                    minHeight: 280,
                                }}
                            >
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                    <Footer className="footer">create by @limingying</Footer>
                </Layout>
            </>
        );
    }
}

export default MenuBars;

