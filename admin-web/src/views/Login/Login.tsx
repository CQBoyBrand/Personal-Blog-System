import { FC, useState } from "react";
import { useNavigate  } from "react-router-dom"
import { Button, Card, Input, message, Space, Spin } from "antd";
import {UserOutlined, KeyOutlined} from "@ant-design/icons/lib";
import md5 from "md5"
import "./Login.scss"
import { login } from "@/api/modules/user";

const Login: FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const isLogin = localStorage.getItem('token')
    if (isLogin) {
        navigate("/")
    }

    const checkLogin = () => {
        if (!username) {
            message.error('用户名不能为空')
            return false
        }
        if (!password) {
            message.error('密码不能为空')
            return false
        }
        setIsLoading(true)
        login({
            username: username,
            password: md5(password)
        }).then((res: any) => {
            
            if (res.code === 200) {
                setTimeout(() => {
                    navigate("/")
                },500)
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('username', res.data.username)
                message.success(res.message)
            } else {
                message.error(res.message)
            }

        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className="login-container">
            <div className="login-div">
                <Spin tip="Loading..." spinning={isLoading}>
                    <Card title="系统登录">
                        <Space direction='vertical' size='large' style={{width: '100%'}}>
                            <Input id='username'
                                size='large'
                                placeholder='登录账号'
                                prefix={<UserOutlined/>}
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                            />

                            <Input.Password id='password'
                                            size='large'
                                            placeholder='登录密码'
                                            prefix={<KeyOutlined/>}
                                            onPressEnter={(e: any) => {
                                                if (e.target.value.trim().length > 6) {
                                                    checkLogin()
                                                }
                                            }}
                                            onChange={(e) => {
                                                setPassword(e.target.value)
                                            }}
                            />

                            <Button type='primary'
                                    size='large'
                                    block
                                    onClick={checkLogin}
                            >
                                进入系统
                            </Button>
                        </Space>
                    </Card>
                </Spin>
            </div>
        </div>
    );
}

export default Login