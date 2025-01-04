import {useEffect, useRef, useState, useImperativeHandle} from 'react';
import {marked} from "marked";
import hljs from 'highlight.js'
import { markedHighlight } from "marked-highlight";
import './mdEditor.scss'
import './preview.scss'

import { basicSetup } from 'codemirror';
import { EditorView , keymap} from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import {defaultKeymap} from "@codemirror/commands"
import { markdown } from '@codemirror/lang-markdown';
import {languages} from "@codemirror/language-data";

const Hilighter = markedHighlight({
  emptyLangClass: 'hljs',
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
})
marked.use({
  async: true,
  gfm: true,
  breaks: true,
})
.use(Hilighter)

async function mdRender(val: string){
    // const replacer = (match) => emoji.emojify(match)
    let html = await marked.parse(val)
    return html.replace(/<a/g, '<a target="_blank"')
}

function MdEditor(props: any) {
    const inputRef = useRef<any>(null) // 获取 输入框 dom
    const mdContainer = useRef(null) // 获取 md 容器 dom
    const fileUpload = useRef<any>()  // 获取 上产文件的input dom
    const previewDom = useRef<any>(null)  // 获取 预览 dom
    const [showUpload, setShowUpload] = useState(false) // 上传图片按钮处理
    const [fullscreen, setFullscreen] = useState(false) // 全屏
    const [mdEditor, setMdEditor] = useState<any>()
    // const [linkToNewPage, setLinkToNewPage] = useState(true)
    const [previewContent, setPreviewContent] = useState<any>() // 预览内容
    // const [mdVal, setMdVal] = useState('') // 预览内容
    useEffect(() => {
        setShowUpload(true)
          const state = EditorState.create({
              doc: props.defaultMd,
              extensions: [
                basicSetup,
                keymap.of(defaultKeymap),
                EditorView.lineWrapping,
                markdown({codeLanguages: languages}),
                EditorView.updateListener.of(async (v) => {
                     //监测得到的最新代码,并渲染到预览界面 
                    //  console.log(view.documentTop)
                    //  console.log(view.contentHeight)
                    if (props && props.updateContent) {
                        props.updateContent(v.state.doc.toString())
                    }
                    setPreviewContent(await mdRender(v.state.doc.toString()))
                    // 预览区和代码区同步滚动
                    // console.log(view)
                 }),
            ],
            });
          const view = new EditorView({
              parent: inputRef.current,
              state,
          });
        setMdEditor(view)
        return () => {
            view.destroy();
        }   
    }, [inputRef, props])
    const insertContentIntoEditor = (type: string, content?: string, ) => {
        const { state, dispatch } = mdEditor;
        const currentPos = state.selection.main.head;
        let insertTxt = "";
        let lastPos = currentPos;
        switch (type) {
            case "image":
                insertTxt = content ? `\n![图片描述](${content})\n` : '\n![]()\n';
                lastPos = currentPos + insertTxt.length;
                break;
            case "link":
                insertTxt = `[]()`;
                lastPos = currentPos + insertTxt.length;
                break;
            case "code":
                insertTxt = `\`\`\`\n\n\`\`\``;
                lastPos = currentPos + 3;
                break;
            case "lineCode":
                insertTxt = `\`\``;
                lastPos = currentPos + 1;
                break;
            case "del":
                insertTxt = `~~~~`;
                lastPos = currentPos + 2;
                break;
            case "table":
                insertTxt = `\n|     |\n| --- |\n|     |\n`;
                break;
            default:
                break;
        }
        dispatch({
          changes: {
            from: currentPos,
            to: currentPos,  // 插入位置到当前位置（没有选区）
            insert: insertTxt,
          },
          selection: { anchor: lastPos },  // 插入后将光标移至文本末尾
        });
        mdEditor.focus()
    }

    // 上传图片-上传
    const fileChange = (e: any) => {
        let file = e.target.files[0]
        if (showUpload) {
            props.imgUpload(file)
        } else {
            insertImage('请自定义配置上传图片的方法')
        }
    }
    // 上传图片-点击事件
    const uploadImage = () => {
        if (fileUpload && fileUpload.current) {
            fileUpload.current.click()
        }
    }

    // 插入图片链接
    const insertImage = (url?: string) => {
        insertContentIntoEditor("image", url);
        fileUpload.current.value = '';
    }
    // 插入代码
    const insertCode = async () => {
        insertContentIntoEditor("code");
    }
    // 插入行内代码
    const insertLineCode = () => {
        insertContentIntoEditor("lineCode");
    }
    // 插入链接
    const insertLink = () => {
        insertContentIntoEditor("link");
    }
    // 删除
    const insertDel = () => {
        insertContentIntoEditor("del");
    }
    // 插入表格
    // const insertTable = () => {
    //     insertContentIntoEditor("table");
    // }

    // 回退
    // const undo = () => {
    //     let position = mdEditor.getCursor() // 获取当前光标位置 {line: 0,ch: 0}
    //     mdEditor.undo()
    //     mdEditor.focus()
    //     mdEditor.setCursor(position)
    // }
    // // 撤销
    // const redo = () => {
    //     let position = mdEditor.getCursor() // 获取当前光标位置 {line: 0,ch: 0}
    //     mdEditor.redo()
    //     console.log(position)
    //     mdEditor.focus()
    //     mdEditor.setCursor(position)
    // }

    // 全屏-开启与退出
    const handleFullScreen = () => {
        let element = mdContainer.current as any;
        let doc = document as any;
        // 判断是否已经是全屏
        // 如果是全屏，退出
        if (fullscreen) {
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            } else if (doc.webkitCancelFullScreen) {
                doc.webkitCancelFullScreen();
            } else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            } else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            }
        } else {    // 否则，进入全屏
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullScreen) {
                element.webkitRequestFullScreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                // IE11
                element.msRequestFullscreen();
            }
        }
        setFullscreen(!fullscreen)
    }

    window.onresize = function () {
        let doc = document as any;
        let isFull = !!(doc.webkitIsFullScreen || doc.mozFullScreen ||
            doc.msFullscreenElement || doc.fullscreenElement
        );//!document.webkitIsFullScreen都为true。因此用!!
        if (isFull === false) {
            setFullscreen(false)
        }
    }

    // 复制DOM
    const handleCopyDom = () => {
        let doc = document as any
        let div = previewDom.current as any
        if (doc.body.createTextRange) {
            let range = doc.body.createTextRange();
            range.moveToElementText(div);
            range.select();
        } else if (window.getSelection) {
            let selection = window.getSelection() as any;
            let range = doc.createRange();
            range.selectNodeContents(div);
            selection.removeAllRanges();
            selection.addRange(range);
            /*if(selection.setBaseAndExtent){
                selection.setBaseAndExtent(text, 0, text, 1);
            }*/
        } else {
            console.warn("none");
        }
        doc.execCommand("Copy"); // 执行浏览器复制命令

        alert("已复制好，去不支持 Markdown 语法的其他平台粘贴试试。");
    }

    // 暴露给父组件使用的方法
    useImperativeHandle(props.cRef, () => ({
        addImg: (params: string) => {
            // 父组件向该组件 markdown 中插入图片链接
            insertImage(params)
        },
        // getInputData() {
        //     // 获取该组件输入的数据，返回给父组件
        //     // 方便父组件拿到数据，和其他数据一起进行存储
        //     return {
        //         md: mdEditor.getValue(), // md 格式
        //         mdToHtml: marked(mdEditor.getValue()) // md 专成 html 格式后的数据
        //     }
        // }
    }))
    return (
        <div className="react-md-container" ref={mdContainer}>
            <div className='react-md-editor-toolbar'>
                <ul className='tool-bar-lists-left'>
                    <li onClick={insertCode}>代码块</li>
                    <li onClick={insertLineCode}>行内代码</li>
                    <li onClick={insertLink}>链接</li>
                    <li onClick={uploadImage}>
                        <input onChange={(e) => fileChange(e)} ref={fileUpload} type="file" style={{display: "none"}}/>
                        上传图片
                    </li>

                    <li onClick={() => insertImage()}>图片链接</li>
                    <li onClick={() => insertDel()}>删除</li>
                    {/* <li onClick={() => insertTable()}>表格</li> */}
                    {/* <li onClick={undo}>回退</li>
                    <li onClick={redo}>撤销</li> */}
                </ul>
                <ul className='tool-bar-lists-right'>
                    <li onClick={() => handleFullScreen()}>{fullscreen ? '退出全屏' : '全屏'}</li>
                    <li onClick={() => handleCopyDom()}>复制DOM</li>
                    {/* <li className='tool-bar-setting'>
                        <div>设置</div>
                        <div className='setting-panel'>
                            <div className='panelItem'>
                                <input id='linkCheck' checked={linkToNewPage} onChange={(e) => {
                                    setLinkToNewPage(e.target.checked)
                                }} type="checkbox"/>
                                <label htmlFor="linkCheck">
                                    链接打开新页面
                                </label>
                            </div>
                        </div>
                    </li> */}
                </ul>
            </div>
            <div className='react-md-editor-main'>
                <div className='react-md-editor-input'>
                    <div style={{position: "absolute", top: 0, left: 0, right: 0, bottom: 0}}>
                        <div style={{height: '100%'}} ref={inputRef}></div>
                    </div>
                </div>
                <div className='react-md-editor-preview'>
                    <div className='preview-box' ref={previewDom}>
                        <div id='r-md-preview' style={{minHeight: '100%', width: '100%'}}
                             dangerouslySetInnerHTML={{__html: previewContent}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MdEditor;
