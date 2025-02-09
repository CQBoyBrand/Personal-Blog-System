import {FC, useEffect, useState} from "react";
import {Button, Form, Input, message, Avatar, Upload} from "antd";
import {useNavigate} from 'react-router-dom'
import {updateUserInfo, userInfo} from "@/api/modules/user";
import {  PlusOutlined } from '@ant-design/icons';
import md5 from "md5";
import { uploadFiles} from "@/api/modules/upload";
import './UserSetting.scss'

const UserSetting: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const [avatar, setAvatar] = useState('')
    const [newUserInfo, setNewUserInfo] = useState({
        id: '',
        password: '',
        nickname: '',
        username: '',
        avatar: '',
        signature: '',
        newpass: ''
    })
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getUserInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo') as string) : {}
        setNewUserInfo(getUserInfo)
        setAvatar(getUserInfo.avatar)
        form.setFieldsValue({
            username: getUserInfo.username,
            nickname: getUserInfo.nickname,
            signature: getUserInfo.signature,
            avatar: getUserInfo.avatar,
        })
    }, [])

    //  图片上传七牛云
    const uploadImg = (req:any) => {
        let filetype = ''
        if (req.file.type === 'image/png') {
            filetype = 'png'
        } else {
            filetype = 'jpg'
        }
        let filename = sessionStorage.getItem('username') + '-user-' + new Date().getTime() + '.' + filetype;
        const keyname = import.meta.env.VITE_DEV === "production" ? filename : import.meta.env.VITE_DEV + '_' + filename;
        const formdata = new FormData()
        formdata.append('file', req.file)
        formdata.append('fileName', keyname)
        formdata.append('type', 'user')
        uploadFiles(formdata).then(res => {
            let avatar = res.data.url;
            form.setFieldsValue({
                avatar:avatar
            })
            setAvatar(avatar)
        })
    }
    // 图片上传前
    const beforeUpload = (file: any, fileList: any) => {
        console.log(fileList)
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
            message.error('上传图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
            message.error('上传图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
    }



    const saveUserInfo = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true)
            let postData = {
                id: newUserInfo.id,
                password: md5(values.oldpass),
                nickname: values.nickname,
                username: values.username,
                avatar: values.avatar,
                signature:values.signature,
                newpass: values.password ? md5(values.password) : undefined
            }
            updateUserInfo(postData).then(res => {
                if (res.code === 200){
                    message.success(res.message)
                    userInfo({
                        username: sessionStorage.getItem('username')
                    }).then(res => {
                        if(res.code === 200) {
                            if (values.password) {
                                sessionStorage.clear()
                                navigate('/login')
                            } else {
                                form.setFieldsValue({
                                    oldpass: '',
                                })
                                setNewUserInfo(res.data)
                                sessionStorage.setItem('userInfo', JSON.stringify(res.data))
                            }

                        }
                    })
                } else {
                    message.error(res.message)
                }
            }).finally(() => setLoading(false))
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }

    const props = {
        name: 'avatar',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        showUploadList: false,
        fileList: [],
        beforeUpload: beforeUpload,
        customRequest: uploadImg,
    };
    return (
        <div className='user-info-setting'>
            <div>
                <Form form={form}
                      className='user-setting-form'
                      style={{width: '60%'}}>
                    <Form.Item
                        label="头像"
                        name="avatar"
                        rules={[{required: true, message: '请上传头像'}]}
                    >
                        <Upload
                            {...props}
                        >
                            {avatar ? <Avatar size={100} src={avatar} /> : <PlusOutlined style={{width: '100px', height: '100px'}} />}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="用户名"
                        name="username"
                    >
                        <Input disabled size='large'/>
                    </Form.Item>
                    <Form.Item
                        label="昵称"
                        name="nickname"
                        rules={[{required: true, message: '昵称不能为空'}]}
                    >
                        <Input size='large'/>
                    </Form.Item>
                    <Form.Item
                        label="个性签名"
                        name="signature"
                        rules={[{required: true, message: '请填写个性签名'}]}
                    >
                        <Input size='large'/>
                    </Form.Item>
                    <Form.Item
                        label="原密码"
                        name="oldpass"
                        rules={[{required: true, message: '请输入原密码'}]}
                    >
                        <Input size='large'/>
                    </Form.Item>
                    <Form.Item
                        label="密码"
                        name="password"
                    >
                        <Input size='large'/>
                    </Form.Item>
                    <Form.Item
                        label="确认密码"
                        name="checkPass"
                        rules={[
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    console.log(rule)
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('两次输入密码不一致!');
                                },
                            })
                            ]}
                    >
                        <Input size='large'/>
                    </Form.Item>
                    <Form.Item>
                        <Button loading={loading} style={{marginLeft: '100px'}} type="primary" htmlType="submit" onClick={saveUserInfo}>
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default UserSetting