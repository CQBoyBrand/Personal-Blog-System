import {FC, useEffect, useState} from "react";
import {Table, Button, Modal, Input, Form, message} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons'
import {addLink, editLink, getLink, updateLinkStatus} from "@/api/modules/link";
const { confirm } = Modal;

const Friend: FC = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [total, setTotal] = useState(0)
    const [visible, setVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('添加友链')
    const [editData, setEditData] = useState({})
    const [handlerType, setHandlerType] = useState('add')
    const [currentId, setCurrentId] = useState('')
    const colums = [
        {
        title: '网站名字',
        dataIndex: 'siteName',
        key: 'siteName',
    }, {
        title: '网站地址',
        dataIndex: 'siteUrl',
        key: 'siteUrl',
        render: (siteUrl: string) => {
            return <a href={siteUrl} rel="noopener noreferrer" target='_blank'>{siteUrl}</a>
        }
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: '100px',
        render: (status: any) => {
            if (status === 0) {
                return <span style={{color: 'red'}}>未公开</span>
            } else if (status === 1) {
                return <span>公开</span>
            }
        },
    }, {
        title: '操作',
        width: '200px',
        render: (row: any, record: any) => {
            console.log(row)
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
                            恢复
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
            title: '确认要操作该友链吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                updateLinkStatus(params).then(res => {
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
        siteName: '',
        siteUrl: '',
    }) => {
        form.setFieldsValue(info)
    }

    const editFriendInfo = (info: any) => {
        setModalTitle('编辑友链')
        setVisible(true)
        setHandlerType('edit')
        setEditData(info)
        setCurrentId(info.id)
        setFormData(info)
    }
    const getUrllList = (page?: any, pageSize?: any) => {
        let params = {
            currentPage: page || currentPage,
            limit: pageSize || limit
        }
        getLink(params).then(res => {
            let result = res.data
            if (res.code === 200) {
                setDataSource(result.data)
                if (result.data.length > 0) {
                    setTotal(result.total)
                }
            }
        })
    }

    useEffect(() => {
        getUrllList()
    }, [])
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
                addLink(values).then(res => {
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
                editLink(editParams).then(res => {
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

    return (
        <div className='wrapper-div'>
            <div>
                <Button type="primary" onClick={() => {
                    setModalTitle('添加友链')
                    setVisible(true)
                    setEditData({})
                    setCurrentId('')
                    setHandlerType('add')
                    setFormData()
                }} style={{marginBottom: '20px'}}>
                    添加友链
                </Button>
            </div>
            <Table
                rowKey='id'
                pagination = {
                    {
                        total: total,
                        onChange: pageChange,
                        current: currentPage
                    }
                }
                columns={colums}
                dataSource={dataSource}/>

            <Modal
                title={modalTitle}
                visible={visible}
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
                        label="网站名称"
                        name="siteName"
                        rules={[{ required: true, message: '请输入网站名称!' }]}
                    >
                        <Input placeholder="请输入网站名称"/>
                    </Form.Item>

                    <Form.Item
                        label="网站地址"
                        name="siteUrl"
                        rules={[{ required: true, message: '请输入网站地址!' }]}
                    >
                        <Input placeholder='请输入完整链接，例如:http://www.brandhuang.com' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default Friend