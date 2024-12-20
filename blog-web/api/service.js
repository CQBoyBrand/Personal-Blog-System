import {post, get} from "./axios";
const articlePrefix = '/article'
const categoryPrefix = '/category'
const tagPrefix = '/tag'
const commentPrefix = '/comment'
const linkPrefix = '/link'
const configPrefix = '/config'
// 获取网站配置
export function getSiteConfig(params) {
  return get(configPrefix + '/getSiteConfig',params)
}
// 获取首页文章列表
export  function getArtAll(params) {
  return post(articlePrefix + '/getArticleListAll',params)
}
// 获取文章详情
export  function getArtDetail(params) {
  return post(articlePrefix + '/getArticleDetail',params)
}
// 获取热门文章
export  function getArticleHot() {
  return get(articlePrefix + '/getArticleHot')
}
// 获取标签
export  function getFontTagList() {
  return post(tagPrefix + '/getFontTagList')
}
// 获取分类
export  function getFontCategoryList() {
  return post(categoryPrefix + '/getFontCategoryList')
}
// 按标签获取文章
export  function getArticleListByTag(params) {
  return post(articlePrefix + '/getArticleListByTag',params)
}
// 按分类获取文章
export  function getArtByCategory(params) {
  return post(articlePrefix + '/getArtByCategory',params)
}
// 按导航栏获取文章
export  function getArtByType(params) {
  return post(articlePrefix + '/getArtByType',params)
}

// 按搜索获取文章
export  function getArtByKeyword(params) {
  return post(articlePrefix + '/getArtByKeyword',params)
}
// 归档文章
export  function getArchive(params) {
  return post(articlePrefix + '/getArchive',params)
}
// 添加评论
export  function addComment(params) {
  return post(commentPrefix + '/addComment',params)
}
// 添加回复
export  function addReplyComment(params) {
  return post(commentPrefix + '/addReplyComment',params)
}
// 获取评论
export  function getComment(params) {
  return post(commentPrefix + '/getComment',params)
}
// 获取评论
export  function getlinkList(params) {
  return post(linkPrefix + '/getlinkList',params)
}
