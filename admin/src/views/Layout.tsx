import React, {FC, useEffect, useState} from "react";
import {Layout, Menu, Dropdown, message} from 'antd';
import {useHistory, Link, Switch} from 'react-router-dom'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    HomeOutlined,
    TagOutlined,
    SettingOutlined,
    LinkOutlined,
    DownOutlined,
    OrderedListOutlined,
    AppstoreAddOutlined,
    MessageOutlined,
    EditOutlined,
    CoffeeOutlined,
} from '@ant-design/icons';
import '../static/css/layout.scss'
import routerConfigs from "../router/routerConfig";
import RouterView from "../router/router";
import {userInfo} from "../api/modules/user";

const {Header, Sider, Content, Footer} = Layout;
const {SubMenu} = Menu;

const renderIcon = (iconStr: string) => {
    switch (iconStr) {
        case 'HomeOutlined':
            return <HomeOutlined/>
        case 'TagOutlined':
            return <TagOutlined/>
        case 'SettingOutlined':
            return <SettingOutlined/>
        case 'LinkOutlined':
            return <LinkOutlined />
        case 'OrderedListOutlined':
            return <OrderedListOutlined />
        case 'AppstoreAddOutlined':
            return <AppstoreAddOutlined />
        case 'MessageOutlined':
            return <MessageOutlined />
        case 'EditOutlined':
            return <EditOutlined />
        case 'CoffeeOutlined':
            return <CoffeeOutlined />
    }
}

const LayoutIndex: FC = (props) => {
    const history = useHistory()
    const [collapsed, setCollapsed] = useState(false)
    const [nickname, setNickname] = useState('')

    const toggle = () => {
        setCollapsed(!collapsed)
    }
    let pathLevel1 = '/' + history.location.pathname.split('/')[1]
    let currentPath = pathLevel1
    if (history.location.pathname.split('/')[2]) {
        currentPath = pathLevel1 + '/' + history.location.pathname.split('/')[2]
    }
    let defaultOpenKeys = '/' + currentPath.split('/')[1]
    const menu = routerConfigs[0]

    const logoutHandler = () => {
        sessionStorage.clear()
        message.success('退出成功')
        history.push('/login')
    }
    useEffect(() => {
        userInfo({
            username: sessionStorage.getItem('username')
        }).then(res => {
            if (res.code === 200) {
                sessionStorage.setItem('userInfo', JSON.stringify(res.data))
                setNickname(res.data.nickname)
            }
        })
    }, [])
    const dropMenu = (
        <Menu>
            <Menu.Item key="0">
                <a href="http://www.brandhuang.com/" rel="noopener noreferrer" target='_blank'>前往博客</a>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="3" onClick={logoutHandler}>退出登录</Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{height: '100vh'}}>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo"
                     style={{textAlign: "center", color: '#fff', lineHeight: '32px', fontSize: '16px'}}>
                    {collapsed ? '崽儿' : '重庆崽儿Brand'}
                </div>
                <Menu theme="dark" mode="inline"
                      defaultOpenKeys={[defaultOpenKeys]}
                      selectedKeys={[currentPath]}
                      defaultSelectedKeys={[currentPath]}>
                    {
                        menu.children ? menu.children.map((menuItem: any) => {
                            if (menuItem.children) {
                                return (
                                    <SubMenu key={menuItem.path} icon={renderIcon(menuItem.meta.icon)}
                                             title={menuItem.meta.title}>
                                        {
                                            menuItem.children.map((childItem: any) => {
                                                return (
                                                    <Menu.Item key={childItem.path}
                                                               icon={renderIcon(childItem.meta.icon)}>
                                                        <Link to={childItem.path}>
                                                            {childItem.meta.title}
                                                        </Link>
                                                    </Menu.Item>
                                                )
                                            })
                                        }
                                    </SubMenu>
                                )
                            } else {
                                return (
                                    <Menu.Item key={menuItem.path} icon={renderIcon(menuItem.meta.icon)}>
                                        <Link to={menuItem.path}>
                                            {menuItem.meta.title}
                                        </Link>
                                    </Menu.Item>
                                )
                            }
                        }) : ''
                    }
                </Menu>
            </Sider>
            <Layout>
                <Header className="site-layout-background site-layout"
                        style={{padding: 0, position: "sticky", top: 0, zIndex: 999}}>
                    <div>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                    </div>
                    <div className='login-info'>
                        <Dropdown overlay={dropMenu} trigger={['click']}>
                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                欢迎回来，{nickname} <DownOutlined/>
                            </a>
                        </Dropdown>
                    </div>
                </Header>
                <div style={{
                    flex: '1',
                    display: "flex",
                    flexDirection: "column",
                }}>
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            minHeight: 280,
                            flex: 1,
                            overflow: "auto"
                        }}
                    >
                        <Switch>
                            {
                                routerConfigs.map(item => {
                                    return <RouterView key={item.path} routes={item.children}/>
                                })
                            }
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', fontSize: '12px', color: '#666', height: '66px'}}>Blog System
                        Created by <a rel="noopener noreferrer" style={{fontSize: '12px', color: '#666'}} href="http://www.brandhuang.com"
                                      target='_blank'>重庆崽儿Brand</a></Footer>
                </div>
            </Layout>
        </Layout>
    );
}

export default LayoutIndex