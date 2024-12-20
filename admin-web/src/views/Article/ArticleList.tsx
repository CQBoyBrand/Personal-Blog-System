import React, {FC, useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import {Button, message, Modal, Table, Tag} from "antd";
import {ExclamationCircleOutlined} from '@ant-design/icons'
import {timestampToTime} from "@/utils/utils";
import {getArticleList, updateArtStatus} from "../../api/modules/article";
import "./article.scss"

const {confirm} = Modal;

const ArticleList: FC = () => {
    const navigate = useNavigate()
    const [dataSource, setDataSource] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [total, setTotal] = useState(0)
    const columns = [
        {title: '文章标题', dataIndex: 'artTitle', key: 'artTitle'},
        {
            title: '所属板块',
            dataIndex: 'artType',
            key: 'artType',
            width: 100,
            render: (artType: any) => {
                if (artType === 'code') {
                    return '代码'
                } else if (artType === 'life') {
                    return '生活'
                } else {
                    return <span style={{color:'#999'}}>未设置</span>
                }
            },
        },
        {title: '所属分类', dataIndex: 'category', key: 'category', width: 100},
        {
            title: '创建时间',
            dataIndex: 'cdate',
            key: 'cdate',
            width: 200,
            render: (cdate: any) => {
                return timestampToTime(cdate)
            }
        },
        {
            title: '修改时间',
            dataIndex: 'editdate',
            key: 'editdate',
            width: 200,
            render: (editdate: any) => {
                return timestampToTime(editdate)
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            render: (status: any) => {
                if (status === 0) {
                    return <span style={{color: 'red'}}>已隐藏</span>
                } else if (status === 1) {
                    return <span>已发布</span>
                }
            },
        },
        {
            title: '操作',
            width: '200px',
            render: (row: any, record: any) => {
                return (
                    <div>
                        <Button type="primary" onClick={() => {
                            editArticle(record)
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
                                隐藏
                            </Button>}

                    </div>

                )
            }
        },
    ];

    const getArticleListHandler = (page?: any, pageSize?: any) => {
        let params = {
            currentPage: page || currentPage,
            limit: pageSize || limit
        }
        getArticleList(params).then(res => {
            let result = res.data
            if (res.code === 200) {
                if (result.data.length > 0) {
                    setTotal(result.total)
                }
                setDataSource(result.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getArticleListHandler()
    }, [])
    const pageChange = (page: any, pageSize: any) => {
        setCurrentPage(page)
        setLimit(pageSize)
        getArticleListHandler(page, pageSize)
    }
    const tagStrToArr = (tagStr: string) => {
        // 把标签字符串转成数组
        return tagStr.split(',')
    }
    const expandElement = (content: any) => {
        return (
            <div className='expand-div'>
                <div className='expand-content-wrap'>
                    <div className='expand-label'>[标签]：</div>
                    <div className='expand-content'>
                        {
                            tagStrToArr(content.tag).map((tagItem, index) => {
                                return (
                                    <Tag color="blue" key={index}>{tagItem}</Tag>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='expand-content-wrap'>
                    <div className='expand-label'>[阅读]：</div>
                    <div className='expand-content'>{content.pv} 次</div>
                </div>
                <div className='expand-content-wrap'>
                    <div className='expand-label'>[评论]：</div>
                    <div className='expand-content'>{content.discuss} 条</div>
                </div>
                <div className='expand-content-wrap'>
                    <div className='expand-label'>[摘要]：</div>
                    <div className='expand-content'>{content.abstract}</div>
                </div>
            </div>
        )
    }

    const editArticle = (rowData: any) => {
        confirm({
            title: '确认要去编辑这篇文章吗?',
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                navigate('/article/articlePublish?id=' + rowData.id)
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    const changeStatus = (rowData: any) => {
        let st = -1
        if (rowData.status === 0) {
            st = 1
        } else if (rowData.status === 1) {
            st = 0
        }
        let params = {
            id: rowData.id,
            status: st
        }
        confirm({
            title: '确认要修改这篇文章的状态吗?',
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                updateArtStatus(params).then(res => {
                    if (res.code === 200) {
                        getArticleListHandler()
                        message.success(res.message)
                    } else {
                        message.error(res.message)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (
        <div className='wrapper-div'>
            <Table
                columns={columns}
                rowKey='id'
                pagination={
                    {
                        total: total,
                        onChange: pageChange,
                        current: currentPage
                    }
                }
                expandable={{
                    expandedRowRender: record => expandElement(record)
                }}
                dataSource={dataSource}
            />
        </div>
    )
}

export default ArticleList