import {FC, useEffect, useState} from "react";
import {Table, Button, Modal, Input, Form, message, Select} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons'
import {addCategory, delCategory, editCategory, getCategory} from "@/api/modules/category";
import {timestampToTime} from "@/utils/utils";
const { confirm } = Modal;
const {Option} = Select;

const Category: FC = () => {
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    // const [limit, setLimit] = useState(10)
    const limit = 10;
    const [total, setTotal] = useState(0)
    const [visible, setVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('添加分类')
    // const [editData, setEditData] = useState({})
    const [handlerType, setHandlerType] = useState('add')
    const [currentId, setCurrentId] = useState('')
    const [loading, setLoading] = useState(false);
    const colums: any = [
        {
            title: '分类名字',
            dataIndex: 'categoryname',
            key: 'categoryname',
            width: 100
        }, {
            title: '所属板块',
            dataIndex: 'categorytype',
            key: 'categorytype',
            width: 100,
            render: (categorytype: any) => {
                if (categorytype === 'code') {
                    return '代码'
                } else if (categorytype === 'life') {
                    return '生活'
                } else {
                    return <span style={{color:'#999'}}>未设置</span>
                }
            },
        }, {
            title: '分类描述',
            dataIndex: 'categorydesc',
            key: 'categorydesc',
        },{
            title: '使用分类的文章数(篇)',
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
            title: '确认要操作该分类吗?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                if (info.artNum > 0) {
                    message.info('该分类正在使用中，无发进行操作！')
                } else {
                    delCategory(params).then(res => {
                        if (res.code === 200) {
                            getCategoryList()
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
        categoryname: '',
        categorydesc: '',
    }) => {
        form.setFieldsValue(info)
    }

    const editInfo = (info: any) => {
        setModalTitle('编辑分类')
        setVisible(true)
        setHandlerType('edit')
        // setEditData(info)
        setCurrentId(info.id)
        setFormData(info)
    }
    const getCategoryList = (page?: any) => {
        setLoading(true)
        let params = {
            currentPage: page || currentPage,
            limit: limit
        }
        getCategory(params).then(res => {
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
        // console.log(editData)
        getCategoryList()
    }, [])
    const pageChange = (page: any) => {
        setCurrentPage(page)
        getCategoryList(page)
    }

    const handleCancel = () => {
        // setEditData({})
        setVisible(false)
    }
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if (handlerType === 'add') {
                addCategory(values).then(res => {
                    if (res.code === 200) {
                        getCategoryList()
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
                editCategory(editParams).then(res => {
                    if (res.code === 200) {
                        getCategoryList()
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
                    setModalTitle('添加分类')
                    setVisible(true)
                    // setEditData({})
                    setCurrentId('')
                    setHandlerType('add')
                    setFormData()
                }} style={{marginBottom: '10px', marginTop: "10px"}}>
                    添加分类
                </Button>
            </div>
            <Table
                rowKey='id'
                loading={loading}
                scroll={{
                    x: "max-content"
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
                    // initialValues={editData || {}}
                >
                    <Form.Item
                        label="所属分类"
                        name="categorytype"
                        initialValue={'code'}
                        rules={[{required: true, message: '请选择发布板块'}]}
                    >
                        <Select
                            size={"large"}
                            style={{width: '200px'}}
                            placeholder="请选择发布板块"
                        >
                            <Option value='code'>代码</Option>
                            <Option value='life'>生活</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="分类名称"
                        name="categoryname"
                        rules={[{ required: true, message: '请输入分类名称!' }]}
                    >
                        <Input placeholder="请输入分类名称"/>
                    </Form.Item>

                    <Form.Item
                        label="分类描述"
                        name="categorydesc"
                        rules={[{ required: true, message: '请描述下这个分类!' }]}
                    >
                        <Input placeholder='请描述下这个分类！' />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default Category