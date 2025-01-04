/**
 * Author：brand
 * Creation Time：2019-03-12 16:20
 * Email：brandhuang@qq.com
 */
import ax from '../api'
const prefix = '/upload'
//
export function uploadFiles (params: any) {
  return ax.post(prefix + '/upload', params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then(res => res.data)
    .catch(e => e)
}
