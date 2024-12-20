/**
 * Author：brand
 * Creation Time：2019-03-12 16:20
 * Email：brandhuang@qq.com
 */
import ax from '../api'
const prefix = '/qiniu'
//
export function getQNToken () {
  return ax.get(prefix + '/getQNToken')
    .then(res => res.data)
    .catch(e => e)
}
//
export function uploadToQN (url: string,params?: Object) {
  return ax.post(url, params)
    .then(res => res.data)
    .catch(e => e)
}
