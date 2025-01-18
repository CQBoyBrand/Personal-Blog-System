/**
 * Author：brand
 * Creation Time：2019-03-12 20:28
 * Email：brandhuang@qq.com
 */
import ax from '../api'

const prefix = '/ad'

// 添加广告
export function createAd (params: Object) {
  return ax.post(prefix + '/createAd',params)
    .then(res => res.data)
    .catch(e => e)
}

// 获取广告列表
export function getAd (params: Object) {
  return ax.post(prefix + '/getAd',params)
    .then(res => res.data)
    .catch(e => e)
}

// 编辑广告
export function editAd (params: Object) {
  return ax.post(prefix + '/editAd',params)
    .then(res => res.data)
    .catch(e => e)
}

// 修改广告状态
export function updateAdStatus (params: Object) {
  return ax.post(prefix + '/updateAdStatus',params)
    .then(res => res.data)
    .catch(e => e)
}
