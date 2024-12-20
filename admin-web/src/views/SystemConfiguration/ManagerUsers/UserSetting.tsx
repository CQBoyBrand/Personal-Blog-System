import React, {FC, useEffect, useState} from "react";
import {Button, Form, Input, message, Avatar, Upload} from "antd";
import {useNavigate} from 'react-router-dom'
import {updateUserInfo, userInfo} from "@/api/modules/user";
import {  PlusOutlined } from '@ant-design/icons';
import md5 from "md5";
import {getQNToken, uploadToQN} from "@/api/modules/qn";

const UserSetting: FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate()
    const domain = 'https://upload-z0.qiniup.com' // 七牛云的上传地址，根据自己所在地区选择，我这里是华东
    const qiniuaddr = 'static.brandhuang.com' // 这是七牛云空间的外链默认域名，可换成自己的   p063wr224.bkt.clouddn.com
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
        // let config = {
        //     headers: { 'Content-Type': 'multipart/form-data' }
        // }
        let filetype = ''
        if (req.file.type === 'image/png') {
            filetype = 'png'
        } else {
            filetype = 'jpg'
        }
        // 重命名要上传的文件
        const keyname = sessionStorage.getItem('username') + '-' + new Date().getTime()  + '.' + filetype

        getQNToken().then(res => {
                const formdata = new FormData()
                formdata.append('file', req.file)
                formdata.append('token', res.data)
                formdata.append('key', keyname)
                // 获取到凭证之后再将文件上传到七牛云空间
                uploadToQN(domain, formdata).then( (result: { key: string; }) => {
                    let avatar = 'http://' + qiniuaddr + '/' + result.key
                    form.setFieldsValue({
                        avatar:avatar
                    })
                    setAvatar(avatar)
                })
        })
    }
    // 图片上传前
    const beforeUpload = (file: any, fileList: any) => {
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
            })
            console.log('Success:', values);
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
                        <Button style={{marginLeft: '100px'}} type="primary" htmlType="submit" onClick={saveUserInfo}>
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default UserSetting