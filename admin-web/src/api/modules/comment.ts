/**
 * Author：brand
 * Creation Time：2019-03-12 20:28
 * Email：brandhuang@qq.com
 */
import ax from '../api'

const prefix = '/comment'

// 获取评论列表
export function getComment (params: Object) {
  return ax.post(prefix + '/getComment',params)
    .then(res => res.data)
    .catch(e => e)
}

// 审核评论
export function checkComment (params: Object) {
  return ax.post(prefix + '/checkComment',params)
    .then(res => res.data)
    .catch(e => e)
}

// 删除评论
export function deleteComment (params: Object) {
  return ax.post(prefix + '/deleteComment',params)
    .then(res => res.data)
    .catch(e => e)
}
