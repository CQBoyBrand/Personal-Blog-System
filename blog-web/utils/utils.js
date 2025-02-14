/**
 * @Author: brand
 * @Date: 2019-07-13 21:25
 * @Email: brandhuang@qq.com
 */
import {marked} from "marked";
import * as emoji from 'node-emoji'
import { markedHighlight } from "marked-highlight";
import markedKatex from "marked-katex-extension";
import markedFootnote from 'marked-footnote'
import hljs from 'highlight.js'
const Hilighter = markedHighlight({
  emptyLangClass: 'hljs',
  langPrefix: 'hljs language-',
  highlight(code, lang, info) {
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
.use(markedKatex({
  throwOnError: false
})).use(markedFootnote())
export async function mdRender(val){
  const replacer = (match) => emoji.emojify(match)
  let html = await marked.parse(val.replace(/(:.*:)/g, replacer))
    return html.replace(/<a/g, '<a target="_blank"')
}

export function timestampToTime (timestamp) {
  let date = new Date(parseInt(timestamp))// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return Y + M + D + h + m + s
}
