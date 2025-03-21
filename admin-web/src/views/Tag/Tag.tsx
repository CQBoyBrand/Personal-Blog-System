import {FC, useEffect, useState} from "react";
import {Table, Button, Modal, Input, Form, message} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons'
import {timestampToTime} from "@/utils/utils";
import {addTag, delTag, editTag, getTag} from "@/api/modules/tag";
const { confirm } = Modal;

const Tag: FC = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [total, setTotal] = useState(0)
    const [visible, setVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('添加分类')
    const [editData, setEditData] = useState({})
    const [handlerType, setHandlerType] = useState('add')
    const [currentId, setCurrentId] = useState('')
    const [loading, setLoading] = useState(false);
    const colums: any = [
        {
            title: '标签名字',
            dataIndex: 'tagname',
            key: 'tagname',
        }, {
            title: '标签描述',
            dataIndex: 'tagdesc',
            key: 'tagdesc',
        },{
            title: '使用该标签的文章数(篇)',
            dataIndex: 'artNum',
            key: 'artNum',
            width: 180
        },{
            title: '创建时间',
            dataIndex: 'cdate',
            key: 'cdate',
            width: 200,
            render: (cdate: any) => {
                return timestampToTime(cdate)
            }
        },{
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status: any) => {
                if (status === 0) {
                    return <span style={{color: 'red'}}>已禁用</span>
                } else if (status === 1) {
                    return <span>启用</span>
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
                            editInfo(record)
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
            title: '确认要操作该标签吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                if (info.artNum > 0) {
                    message.info('该标签正在使用中，无发进行操作！')
                } else {
                    delTag(params).then(res => {
                        if (res.code === 200) {
                            getTagList()
                            message.success(res.message)
                        } else {
                            message.error(res.message)
                        }
                    })

                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }
    const setFormData = (info: any = {
        tagname: '',
        tagdesc: '',
    }) => {
        form.setFieldsValue(info)
    }

    const editInfo = (info: any) => {
        setModalTitle('编辑标签')
        setVisible(true)
        setHandlerType('edit')
        setEditData(info)
        setCurrentId(info.id)
        setFormData(info)
    }
    const getTagList = (page?: any, pageSize?: any) => {
        setLoading(true);
        let params = {
            currentPage: page || currentPage,
            limit: pageSize || limit
        }
        getTag(params).then(res => {
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
        getTagList()
    }, [])
    const pageChange = (page: any, pageSize?:any) => {
        setCurrentPage(page)
        setLimit(pageSize)
        getTagList(page, pageSize)
    }

    const handleCancel = () => {
        setEditData({})
        setVisible(false)
    }
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (handlerType === 'add') {
                addTag(values).then(res => {
                    if (res.code === 200) {
                        getTagList()
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
                editTag(editParams).then(res => {
                    if (res.code === 200) {
                        getTagList()
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
                    setModalTitle('添加标签')
                    setVisible(true)
                    setEditData({})
                    setCurrentId('')
                    setHandlerType('add')
                    setFormData()
                }} style={{marginBottom: '20px'}}>
                    添加标签
                </Button>
            </div>
            <Table
                rowKey='id'
                scroll={{
                    x: "max-content",
                     y: "calc(100vh - 300px)"
                }}
                loading={loading}
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
                        label="标签名"
                        name="tagname"
                        rules={[{ required: true, message: '请输入标签名称!' }]}
                    >
                        <Input placeholder="请输入标签名称"/>
                    </Form.Item>

                    <Form.Item
                        label="标签描述"
                        name="tagdesc"
                        rules={[{ required: true, message: '请描述下这个标签!' }]}
                    >
                        <Input placeholder='请描述下这个标签！' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default Tag