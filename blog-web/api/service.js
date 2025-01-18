import useHttp from "~/composables/getData"
const articlePrefix = '/article'
const categoryPrefix = '/category'
const tagPrefix = '/tag'
const commentPrefix = '/comment'
const linkPrefix = '/link'
const configPrefix = '/config'
const visitPrefix = '/visit'
const statisticsPrefix = '/sticstatis'
const adPrefix = '/ad'
// 获取广告列表
export function getAdList() {
  return useHttp({
    url: adPrefix + '/getAd',
    method: 'post',
  }).catch((err) => {
    console.log(err)  
  })
}
// 发送客户端信息到服务端
export function setVisitInfo() {
  return useHttp({
    url: visitPrefix + '/setVisitInfo',
    method: 'post',
    cache: false
  }).catch((err) => {
    console.log(err)  
  })
}
// 获取网站统计信息
export function getStatisticsInfo() {
  return useHttp({
    url: statisticsPrefix + '/getStatisticsInfo',
    method: 'post',
  }).catch((err) => {
    console.log(err)  
  })
}
// 获取网站配置
export function getSiteConfig(params) {
  return useHttp({
    url: configPrefix + '/getSiteConfig',
    method: 'get',
    params
  }).catch((err) => {
    console.log(err)  
  })
}
// 获取首页文章列表
export function getArtAll(params) {
  return useHttp({
    url: articlePrefix + '/getArticleListAll',
    method: 'post',
    params
  }).catch((err) => {
    console.log(err)  
  })
}
// 获取文章详情
export function getArtDetail(params) {
  return useHttp({
    url: articlePrefix + '/getArticleDetail',
    method: 'post',
    params
  }).catch((err) => {
    console.log(err)  
  })
}
// 获取热门文章
export function getArticleHot() {
  return useHttp({
    url: articlePrefix + '/getArticleHot',
    method: 'get'
  }).catch((err) => {
    console.log(err)  
  })
}
// 获取标签
export function getFontTagList() {
  return useHttp({
    url: tagPrefix + '/getFontTagList',
    method: 'post'
  }).catch((err) => {
    console.log(err)  
  })
}
// 获取分类
export  function getFontCategoryList() {
  return useHttp({
    url: categoryPrefix + '/getFontCategoryList',
    method: 'post'
  }).catch((err) => {
    console.log(err)  
  })
}
// 按标签获取文章
export function getArticleListByTag(params) {
  return useHttp({
    url: articlePrefix + '/getArticleListByTag',
    method: 'post',
    params
  }).catch((err) => {
    console.log(err)  
  })
}
// 按分类获取文章
export function getArtByCategory(params) {
  return useHttp({
    url: articlePrefix + '/getArtByCategory',
    method: 'post',
    params
  }).catch((err) => {
    console.log(err)  
  })
}
// 按导航栏获取文章
export  function getArtByType(params) {
  return useHttp({
    url: articlePrefix + '/getArtByType',
    params,
    method: 'post',
  }).catch((err) => {
    console.log(err)  
  })
}

// 按搜索获取文章
export  function getArtByKeyword(params) {
  return useHttp({
    url: articlePrefix + '/getArtByKeyword',
    params,
    method: 'post',
  }).catch((err) => {
    console.log(err)  
  })
}
// 归档文章
export function getArchive(params) {
  return useHttp({
    url: articlePrefix + '/getArchive',
    params,
    method: 'post',
  }).catch((err) => {
    console.log(err)  
  })
}
// 添加评论
export  function addComment(params) {
  return useHttp({
    url: commentPrefix + '/addComment',
    params,
    method: 'post',
  }).catch((err) => {
    console.log(err)  
  })
}
// 添加回复
export  function addReplyComment(params) {
  return useHttp({
    url: commentPrefix + '/addReplyComment',
    params,
    method: 'post',
  }).catch((err) => {
    console.log(err)  
  })
}
// 获取评论
export  function getComment(params) {
  return useHttp({
    url:commentPrefix + '/getComment',
    params,
    method: 'post',
  }).catch((err) => {
    console.log(err)  
  })
}
// 获取评论
export  function getlinkList(params) {
  return useHttp({
    url: linkPrefix + '/getlinkList',
    params,
    method: 'post',
  }).catch((err) => {
    console.log(err)  
  })
}
