import useHttp from "~/composables/getData"
const articlePrefix = '/article'
const categoryPrefix = '/category'
const tagPrefix = '/tag'
const commentPrefix = '/comment'
const linkPrefix = '/link'
const configPrefix = '/config'
// 获取网站配置
export function getSiteConfig(params) {
  return useHttp({
    url: configPrefix + '/getSiteConfig',
    method: 'get',
    params
  })
}
// 获取首页文章列表
export function getArtAll(params) {
  return useHttp({
    url: articlePrefix + '/getArticleListAll',
    method: 'post',
    params
  })
}
// 获取文章详情
export function getArtDetail(params) {
  return useHttp({
    url: articlePrefix + '/getArticleDetail',
    method: 'post',
    params
  })
}
// 获取热门文章
export function getArticleHot() {
  return useHttp({
    url: articlePrefix + '/getArticleHot',
    method: 'get'
  })
}
// 获取标签
export function getFontTagList() {
  return useHttp({
    url: tagPrefix + '/getFontTagList',
    method: 'post'
  })
}
// 获取分类
export  function getFontCategoryList() {
  return useHttp({
    url: categoryPrefix + '/getFontCategoryList',
    method: 'post'
  })
}
// 按标签获取文章
export function getArticleListByTag(params) {
  return useHttp({
    url: articlePrefix + '/getArticleListByTag',
    method: 'post',
    params
  })
}
// 按分类获取文章
export function getArtByCategory(params) {
  return useHttp({
    url: articlePrefix + '/getArtByCategory',
    method: 'post',
    params
  })
}
// 按导航栏获取文章
export  function getArtByType(params) {
  return useHttp({
    url: articlePrefix + '/getArtByType',
    params,
    method: 'post',
  })
}

// 按搜索获取文章
export  function getArtByKeyword(params) {
  return useHttp({
    url: articlePrefix + '/getArtByKeyword',
    params,
    method: 'post',
  })
}
// 归档文章
export function getArchive(params) {
  return useHttp({
    url: articlePrefix + '/getArchive',
    params,
    method: 'post',
  })
}
// 添加评论
export  function addComment(params) {
  return useHttp({
    url: commentPrefix + '/addComment',
    params,
    method: 'post',
  })
}
// 添加回复
export  function addReplyComment(params) {
  return useHttp({
    url: commentPrefix + '/addReplyComment',
    params,
    method: 'post',
  })
}
// 获取评论
export  function getComment(params) {
  return useHttp({
    url:commentPrefix + '/getComment',
    params,
    method: 'post',
  })
}
// 获取评论
export  function getlinkList(params) {
  return useHttp({
    url: linkPrefix + '/getlinkList',
    params,
    method: 'post',
  })
}
