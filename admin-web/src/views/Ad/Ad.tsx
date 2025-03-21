import {FC, useEffect, useState} from "react";
import {Table, Button, Modal, Input, Form, message, Tabs, Radio} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons'
import { createAd, getAd, editAd, updateAdStatus } from "@/api/modules/ad";
import { timestampToTime } from "@/utils/utils";
const { confirm } = Modal;

const Ad: FC = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [total, setTotal] = useState(0)
    const [visible, setVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('添加广告')
    const [editData, setEditData] = useState({})
    const [handlerType, setHandlerType] = useState('add')
    const [currentId, setCurrentId] = useState('')
    const [loading, setLoading] = useState(false);

    const [currentTab, setCurrentTab] = useState("1")
    const colums: any = [
        {
        title: '广告名字',
        dataIndex: 'adName',
        width: '120px',
        key: 'adName',
    }, {
        title: '广告链接',
        dataIndex: 'adUrl',
        key: 'adUrl',
        width: '140px',
        render: (adUrl: string) => {
            return <a href={adUrl} rel="noopener noreferrer" target='_blank'>{adUrl}</a>
        }
    }, {
        title: '广告图片',
        dataIndex: 'adImage',
        key: 'adImage',
        width: '320px',
        render: (adImage: string) => {
            return <img width={320} height={60} src={adImage} alt="" />
        }
    }, {
        title: '广告描述',
        dataIndex: 'adDesc',
        width: '140px',
        key: 'adDesc',
    }, {
        title: '广告位置',
        dataIndex: 'adPosition',
        width: '100px',
        key: 'adPosition',
    },  {
                title: '创建时间',
                dataIndex: 'cdate',
                key: 'cdate',
                width: 140,
                render: (cdate: any) => {
                    return timestampToTime(cdate)
                }
            },
            {
                title: '修改时间',
                dataIndex: 'updateTime',
                key: 'updateTime',
                width: 140,
                render: (updateTime: any) => {
                    return timestampToTime(updateTime)
                }
            }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '100px',
        render: (status: any) => {
            if (status === 0) {
                return <span style={{color: 'red'}}>未发布</span>
            } else if (status === 1) {
                return <span>已发布</span>
            }
        },
    }, {
        title: '操作',
        width: '200px',
        fixed: 'right',
        render: (record: any) => {
            return (
                <div>
                    <Button type="primary" onClick={() => {
                        editFriendInfo(record)
                    }} style={{marginRight: '20px'}}>
                        编辑
                    </Button>
                    {record.status === 0 ?
                        <Button type="primary" onClick={() => {
                            changeStatus(record)
                        }} ghost>
                            发布
                        </Button> : <Button type="primary" onClick={() => {
                            changeStatus(record)
                        }} danger>
                            删除
                        </Button>}

                </div>

            )
        }
    },
    ]

    const changeStatus = (info: any) => {
        let st = -1
        if (info.status === 0) {
            st = 1
        } else if (info.status === 1) {
            st = 0
        }
        let params = {
            id: info.id,
            status: st
        }
        confirm({
            title: '确认要修改该广告状态吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                updateAdStatus(params).then(res => {
                    if (res.code === 200) {
                        getUrllList()
                        message.success(res.message)
                    } else {
                        message.error(res.message)
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const setFormData = (info: any = {
        adName: '',
        adUrl: '',
        adImage: '',
        adDesc: '',
        adPosition: 'sidebar',
    }) => {
        form.setFieldsValue(info)
    }

    const editFriendInfo = (info: any) => {
        setModalTitle('编辑广告')
        setVisible(true)
        setHandlerType('edit')
        setEditData(info)
        setCurrentId(info.id)
        setFormData(info)
    }
    const getUrllList = (page?: any, pageSize?: any) => {
        setLoading(true)
        let params = {
            currentPage: page || currentPage,
            limit: pageSize || limit,
            status: currentTab
        }
        getAd(params).then(res => {
            let result = res.data
            if (res.code === 200) {
                setDataSource(result.data)
                if (result.data.length > 0) {
                    setTotal(result.total)
                }
            }
        }).finally(() => setLoading(false))
    }

    useEffect(() => {
        // getUrllList()
    }, [])
    useEffect(() => {
        getUrllList(1)
    }, [currentTab])
    const pageChange = (page: any, pageSize: any) => {
        setCurrentPage(page)
        setLimit(pageSize)
        getUrllList(page, pageSize)
    }

    const handleCancel = () => {
        setEditData({})
        setVisible(false)
    }
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (handlerType === 'add') {
                createAd(values).then(res => {
                    if (res.code === 200) {
                        getUrllList()
                        setVisible(false)
                        message.success(res.message)
                    } else {
                        message.error(res.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            } else if (handlerType === 'edit') {
                let editParams = {
                    ...values,
                    id: currentId
                }
                editAd(editParams).then(res => {
                    if (res.code === 200) {
                        getUrllList()
                        setVisible(false)
                        message.success(res.message)
                    } else {
                        message.error(res.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        } catch (errorInfo) {

        }
    }
    const tabChange = (key: string) => {
        setCurrentTab(key)
      };
    return (
        <div className='wrapper-div'>
            <div>
                <Button type="primary" onClick={() => {
                    setModalTitle('添加广告')
                    setVisible(true)
                    setEditData({})
                    setCurrentId('')
                    setHandlerType('add')
                    setFormData()
                }} style={{marginBottom: '20px'}}>
                    添加广告
                </Button>
            </div>
            <Tabs
                items={[
                    {
                        key: '1',
                        label: '已发布',
                    },
                    {
                        key: '0',
                        label: '未发布',
                    }
                ]}
                defaultActiveKey={currentTab}
                onChange={tabChange}
            />
            <Table
                rowKey='id'
                loading={loading}
                scroll={{
                    x: "max-content",
                     y: "calc(100vh - 300px)"
                }}
                pagination = {
                    {
                        total: total,
                        onChange: pageChange,
                        current: currentPage,
                        showTotal: (total) => `共 ${total} 条数据`
                    }
                }
                columns={colums}
                dataSource={dataSource}/>

            <Modal
                title={modalTitle}
                open={visible}
                onOk={handleOk}
                okText='保存'
                cancelText='取消'
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="basic"
                    initialValues={editData || {}}
                >
                    <Form.Item
                        label="广告名称"
                        name="adName"
                        rules={[{ required: true, message: '请输入广告名称!' }]}
                    >
                        <Input placeholder="请输入广告名称"/>
                    </Form.Item>

                    <Form.Item
                        label="广告地址"
                        name="adUrl"
                        rules={[{ required: true, message: '请输入广告地址!' }]}
                    >
                        <Input placeholder='请输入完整链接，例如:http://www.brandhuang.com' />
                    </Form.Item>

                    <Form.Item
                        label="广告图片"
                        name="adImage"
                        rules={[{ required: true, message: '请输入广告图片!' }]}
                    >
                        <Input placeholder='请输入完整链接，例如:http://www.brandhuang.com' />
                    </Form.Item>

                    <Form.Item
                        label="广告描述"
                        name="adDesc"
                        rules={[{ required: true, message: '请输入广告描述!' }]}
                    >
                        <Input placeholder='请输入广告介绍' />
                    </Form.Item>

                    <Form.Item
                        label="广告位置"
                        name="adPosition"
                        rules={[{ required: true, message: '请选择广告位置!' }]}
                    >
                        <Radio.Group>
                            <Radio value="sidebar">侧边栏 </Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Ad