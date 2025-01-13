import {FC, useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from 'react-router-dom'
import {Button, Form, Input, message, Switch, Select, Upload} from "antd";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import MdEditor from "@/components/mdEditor/mdEditor";
import {addArticle, editArticle, getArticleDetail} from "@/api/modules/article";
import {getAllCategory} from "@/api/modules/category";
import {getAllTag} from "@/api/modules/tag";
import { uploadFiles} from "@/api/modules/upload";
import './article.scss'

const {Option} = Select;

const ArticlePublish: FC = () => {
    const [form] = Form.useForm();
    const history = useNavigate()
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const md = useRef(null)
    const [mdRef, setMdRef] = useState<any>()
    const [artTitle, setArtTitle] = useState('') // 文章标题
    const [abstract, setAbstract] = useState('') // 文章摘要
    const [category, setCategory] = useState('') // 文章分类
    const [tag, setTag] = useState() // 文章标签
    const [thumbnail, setThumbnail] = useState('') // 文章缩略图
    const [tagList, setTagList] = useState([]) // 标签列表
    const [categoryList, setCategoryList] = useState([]) // 分类列表
    const [mdContent, setMdContent] = useState('') // 回填 md 数据
    const [articleType, setArticleType] = useState('add') // 编辑或者添加
    const [artDiscuss, setArtDiscuss] = useState(true) // 是否开启文章评论，默认开启
    const [saveLoading, setSaveLoading] = useState(false);
    const [thumbnailType, setThumbnailType] = useState("manual"); // manual ｜ upload
    const uploadImage = (file: any) => {
        console.log(artTitle);
        console.log(abstract);
        console.log(category);
        let filetype = ''
        if (file.type === 'image/png') {
            filetype = 'png'
        } else {
            filetype = 'jpg'
        }
        // 重命名要上传的文件
        let filename = sessionStorage.getItem('username') + '-content-' + new Date().getTime() + '.' + filetype;
        const keyname = import.meta.env.VITE_DEV === "production" ? filename : import.meta.env.VITE_DEV + '_' + filename;
        const formdata = new FormData()
        formdata.append('file', file)
        formdata.append('fileName', keyname)
        formdata.append('type', 'article')
        uploadFiles(formdata).then(res => {
            mdRef.current.addImg(res?.data?.url)
        })

    }
    const updateContent = (content: any) => {
        form.setFieldsValue({
            content: content,
        })
    }
    useEffect(() => {
        // getUploadToken()
    }, [])
    useEffect(() => {
        setMdRef(md)
    }, [md])

    useEffect(() => {
        if (id) {
            setArticleType('edit')
            getArticleDetail({
                id
            }).then((res: any) => {
                if (res.code === 200) {
                    setArtTitle(res.data.artTitle)
                    setAbstract(res.data.abstract)
                    setMdContent(res.data.content)
                    setCategory(res.data.category)
                    setTag(res.data.tag)
                    setThumbnail(res.data.thumbnail)
                    setArtDiscuss(!!res.data.artDiscuss)
                    form.setFieldsValue({
                        artTitle: res.data.artTitle,
                        artType: res.data.artType,
                        abstract: res.data.abstract,
                        category: res.data.category,
                        tag: res.data.tag.split(','),
                        thumbnail: res.data.thumbnail,
                        content: res.data.content,
                        artDiscuss: res.data.artDiscuss,
                    })
                }
            })
        } else {
            form.setFieldsValue({
                artDiscuss: artDiscuss,
            })
            setArticleType('add')
        }
    }, [id])
    useEffect(() => {
        getAllCategory().then(res => {
            if (res.code === 200) {
                res.data.map((item: any) => {
                    item.id = item.id.toString()
                })
                setCategoryList(res.data)
            }
        }).catch(err => {
            console.log(err)
        })

        getAllTag().then(res => {
            if (res.code === 200) {
                res.data.map((item: any) => {
                    item.id = item.id.toString()
                })
                setTagList(res.data)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])
    const saveData = async () => {

        try {
            const values = await form.validateFields();
            setSaveLoading(true)
            if (articleType === 'add') {
                // 新增文章
                let params = {
                    artTitle: values.artTitle,
                    artType: values.artType,
                    abstract: values.abstract,
                    thumbnail: values.thumbnail,
                    content: values.content,
                    category: values.category,
                    tag: values.tag.join(','),
                    artDiscuss: Number(artDiscuss)
                }
                addArticle(params).then(res => {
                    if (res.code === 200) {
                        message.success('文章添加成功')
                        history('/article/articleList')
                    } else {
                        message.error(res.message)
                    }
                }).catch(err => {
                    console.log(err)
                }).finally(() => setSaveLoading(false))
            } else if (articleType === 'edit') {
                // 编辑文章
                let params = {
                    id: id,
                    artTitle: values.artTitle,
                    artType: values.artType,
                    abstract: values.abstract,
                    thumbnail: values.thumbnail,
                    content: values.content,
                    category: values.category,
                    tag: values.tag.join(','),
                    artDiscuss: Number(artDiscuss)
                }
                editArticle(params).then(res => {
                    if (res.code === 200) {
                        message.success('文章修改成功')
                        history('/article/articleList')
                    } else {
                        message.error(res.message)
                    }
                }).catch(err => {
                    console.log(err)
                }).finally(() => setSaveLoading(false))
            }
        } catch (e) {

        }
    }
    const [thumbnailLoading, setThumbnailLoading]= useState(false);
    //  图片上传
    const uploadImg = (req: any) => {
        let filetype = ''
        if (req.file.type === 'image/png') {
            filetype = 'png'
        } else {
            filetype = 'jpg'
        }
        // 重命名要上传的文件

        let filename = sessionStorage.getItem('username') + '-content-' + new Date().getTime() + '.' + filetype;
        const keyname = import.meta.env.VITE_DEV === "production" ? filename : import.meta.env.VITE_DEV + '_' + filename;
        const formdata = new FormData()
        formdata.append('file', req.file)
        formdata.append('fileName', keyname)
        formdata.append('type', 'article')
        setThumbnailLoading(true);
        uploadFiles(formdata).then(res => {
            form.setFieldsValue({
                thumbnail: res.data.url
            })
            setThumbnail(res.data.url)
        }).finally(() => setThumbnailLoading(false))

    }
    // 图片上传前
    const beforeUpload = (file: any) => {
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

    const props = {
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        showUploadList: false,
        fileList: [],
        beforeUpload: beforeUpload,
        customRequest: uploadImg,
    };
    const changeThumbnailType = (type: string) => {
        setThumbnailType(type);
    }
    return (
        <Form form={form} className='article-p-container'>
            <div className='article-p-left'>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Form.Item
                        label="标题"
                        style={{flex: 1,marginRight: '10px'}}
                        name="artTitle"
                        rules={[{required: true, message: '请填写文章标题'}]}
                    >
                        <Input placeholder={'请填写文章标题'} size='large'/>
                    </Form.Item>
                    <Form.Item
                        label="发布到"
                        name="artType"
                        style={{width: "300px"}}
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
                </div>
                <MdEditor defaultMd={mdContent} updateContent={updateContent} imgUpload={uploadImage} cRef={md} save/>
                <Form.Item
                    name="content"
                    className='mdContent'
                    rules={[{required: true, message: '请填写文章内容'}]}
                >
                    <Input size='large'
                           type={"hidden"}/>
                </Form.Item>
            </div>
            <div className='article-p-right'>
                <Form.Item
                    label="摘要"
                    className='abstract-item'
                    name="abstract"
                    rules={[{required: true, message: '请填写文章摘要！'}]}
                >
                    <Input.TextArea
                        rows={5}
                        placeholder={'请填写文章摘要'}
                        style={{minHeight: '33px', resize: "none"}}/>
                </Form.Item>
                <Form.Item
                    label="分类"
                    name="category"
                    rules={[{required: true, message: '请选择一个分类！'}]}
                >
                    <Select
                        placeholder="请选择文章分类"
                        style={{width: "200px"}}
                        allowClear
                    >
                        {
                            categoryList.map((cItem: any, cIndex) => {
                                return <Option value={cItem.id} key={'c-' + cIndex}>{cItem.categoryname}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label="标签"
                    name="tag"
                    initialValue={tag}
                    rules={[{required: true, message: '请选择至少一个标签'}]}
                >
                    <Select
                        placeholder="请选择文章标签"
                        mode="multiple"
                        style={{width: "200px"}}
                        maxTagCount={3}
                        allowClear
                    >
                        {
                            tagList.map((tItem: any, tIndex) => {
                                return <Option value={tItem.id} key={'c-' + tIndex}>{tItem.tagname}</Option>
                            })
                        }
                    </Select>
                </Form.Item>
                {thumbnailType === "manual" && (
                    <Form.Item
                        label={(
                            <div>
                                <div>缩略图</div>
                                <div className="change_thumbnail_type"  onClick={() => changeThumbnailType("upload")}>切换上传</div>
                            </div>
                        )}
                        className='thumbnail-item'
                        name="thumbnail"
                    >
                        <Input size='large'
                            placeholder="文章缩略图"
                            style={{width: "200px"}}
                            onChange={(e) => {
                                setThumbnail(e.target.value)
                            }}/>
                    </Form.Item>
                )}
                 {thumbnailType === "upload" && (
                    <Form.Item
                        label={(
                            <div>
                                <div>缩略图</div>
                                <div className="change_thumbnail_type" onClick={() => changeThumbnailType("manual")}>切换填写</div>
                            </div>
                        )}
                        className='thumbnail-item'
                        name="thumbnail"
                    >
                        <Upload
                            {...props}
                            disabled={thumbnailLoading}
                            className='upload-wrap'
                        >
                            {thumbnail ? <div className='upload-img-div'>
                                <img src={thumbnail} alt=""/>
                            </div> : <div className='upload-img-div plus-icon'>
                                { thumbnailLoading ? <LoadingOutlined /> : <PlusOutlined/>}
                            </div>}
                        </Upload>
                    </Form.Item>
                 )}
                
                <Form.Item label="评论"
                           name="artDiscuss">
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" checked={artDiscuss} onChange={(e) => {
                        setArtDiscuss(e)
                    }}/>
                </Form.Item>
                <Form.Item>
                    <Button type={"primary"} loading={saveLoading} onClick={saveData}>保存</Button>
                </Form.Item>
            </div>
        </Form>
    )
}

export default ArticlePublish