/**
 * Author：brand
 * Creation Time：2019-03-12 20:28
 * Email：brandhuang@qq.com
 */
import ax from '../api'

const prefix = '/sticstatis'

// 获取友配置
export function getStatisticsInfo (params?: Object) {
  return ax.post(prefix + '/getStatisticsInfo',params)
    .then(res => res.data)
    .catch(e => e)
}
