import {FC, useEffect, useState} from "react";
import {Button, Form, Input, message, Switch} from "antd";
import {addConfig, editConfig, getConfig} from "@/api/modules/config";
import './WebSetting.scss'

const WebSetting: FC = () => {
    const [form] = Form.useForm();
    const [icp, setIcp] = useState("")
    const [psr, setPsr] = useState("")
    const [id, setId] = useState()
    const [configType, setConfigType] = useState('add')
    const [discussStatus, setDiscussStatus] = useState(false)


    const getConfigHandler = () => {
        getConfig().then(res => {
            console.log(res)
            if (res.code === 200) {
                if (res.data) {
                    setId(res.data.id)
                    setPsr(res.data.psr)
                    setIcp(res.data.icp)
                    setDiscussStatus(res.data.discussStatus === 1)
                    if (res.data.id > 0) {
                        setConfigType('edit')
                    } else {
                        setConfigType('add')
                    }
                    form.setFieldsValue({
                        icp: res.data.icp,
                        psr: res.data.psr,
                    })
                }
            }
        })
    }
    const saveWebInfo = async () => {

        let webSettingInfo = {
            icp: icp,
            psr: psr,
            discussStatus: discussStatus,
        }
        try {
            const values = await form.validateFields();
            if(configType === 'add') {
                addConfig(webSettingInfo).then(() => {
                    message.success('操作成功')
                    getConfigHandler()
                })
            } else if (configType === 'edit') {
                editConfig({
                    id: id,
                    icp: icp,
                    psr: psr,
                    discussStatus: discussStatus,
                }).then(res => {
                    console.log(res)
                    message.success('操作成功')
                    getConfigHandler()
                })
            }
            console.log('Success:', values);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }
    useEffect(() => {
        getConfigHandler()
    }, [])
    return (
        <div className='web-setting'>
            <Form form={form}
                  className='web-setting-form'
                  style={{width: '60%'}}>
                <Form.Item
                    label="ICP备案号"
                    name="icp"
                    rules={[{required: true, message: '请填写ICP备案号'}]}
                >
                    <Input size='large'
                           onChange={(e) => {
                               setIcp(e.target.value)
                           }}/>
                </Form.Item>
                <Form.Item
                    label="公安备案号"
                    name="psr"
                    rules={[{required: true, message: '请填写公安备案号'}]}
                >
                    <Input size='large'
                           onChange={(e) => {
                               setPsr(e.target.value)
                           }}/>
                </Form.Item>
                <Form.Item
                    label="全站评论"
                    name="discussStatus"
                >
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={discussStatus} onChange={(e) => {
                        setDiscussStatus(e)
                    }}/>
                </Form.Item>
                <Form.Item>
                    <Button style={{marginLeft: '100px'}} type="primary" htmlType="submit" onClick={saveWebInfo}>
                        {configType === 'add' ? '保存' : '更新'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default WebSetting