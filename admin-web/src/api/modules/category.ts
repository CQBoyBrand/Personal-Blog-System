/**
 * Author：brand
 * Creation Time：2019-03-12 20:28
 * Email：brandhuang@qq.com
 */
import ax from '../api'

const prefix = '/category'

// 添加匪类
export function addCategory (params: Object) {
  return ax.post(prefix + '/addCategory', params)
    .then(res => res.data)
    .catch(e => e)
}

// 获取分类列表
export function getCategory (params: Object) {
  return ax.post(prefix + '/getCategory', params)
    .then(res => res.data)
    .catch(e => e)
}
// 获取分类列表（所有，不分页）
export function getAllCategory (params?: Object) {
  return ax.post(prefix + '/getAllCategory', params)
    .then(res => res.data)
    .catch(e => e)
}

// 编辑分类
export function editCategory (params: Object) {
  return ax.post(prefix + '/editCategory', params)
    .then(res => res.data)
    .catch(e => e)
}

// 修改分类状态
export function delCategory (params: Object) {
  return ax.post(prefix + '/delCategory',params)
    .then(res => res.data)
    .catch(e => e)
}
