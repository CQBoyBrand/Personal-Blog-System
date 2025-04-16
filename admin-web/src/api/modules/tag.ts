/**
 * Author：brand
 * Creation Time：2019-03-12 20:28
 * Email：brandhuang@qq.com
 */
import ax from '../api'

const prefix = '/tag'

// 添加标签
export function addTag (params?: Object) {
  return ax.post(prefix + '/addTag', params)
    .then(res => res.data)
    .catch(e => e)
}

// 获取标签列表
export function getTag (params?: Object) {
  return ax.post(prefix + '/getTag', params)
    .then(res => res.data)
    .catch(e => e)
}
// 获取标签列表(所有，不分页)
export function getAllTagPublished (params?: Object) {
  return ax.post(prefix + '/getAllTagPublished', params)
    .then(res => res.data)
    .catch(e => e)
}

// 编辑标签
export function editTag (params?: Object) {
  return ax.post(prefix + '/editTag', params)
    .then(res => res.data)
    .catch(e => e)
}
// 删除标签
export function delTag (params?: Object) {
  return ax.post(prefix + '/delTag', params)
    .then(res => res.data)
    .catch(e => e)
}
