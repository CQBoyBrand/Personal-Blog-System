/**
 * Author：brand
 * Creation Time：2019-03-12 20:28
 * Email：brandhuang@qq.com
 */
import ax from '../api'

const prefix = '/link'

// 添加友链
export function addLink (params: Object) {
  return ax.post(prefix + '/addLink',params)
    .then(res => res.data)
    .catch(e => e)
}

// 获取友链列表
export function getLink (params: Object) {
  return ax.post(prefix + '/getLink',params)
    .then(res => res.data)
    .catch(e => e)
}

// 编辑友链
export function editLink (params: Object) {
  return ax.post(prefix + '/editLink',params)
    .then(res => res.data)
    .catch(e => e)
}

// 删除友链
export function updateLinkStatus (params: Object) {
  return ax.post(prefix + '/updateLinkStatus',params)
    .then(res => res.data)
    .catch(e => e)
}
