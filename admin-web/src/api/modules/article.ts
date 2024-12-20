/**
 * Author：brand
 * Creation Time：2019-03-12 15:07
 * Email：brandhuang@qq.com
 */
import ax from '../api'

const prefix = '/article'

// add
export function addArticle(params?: any) {
    return ax.post(prefix + '/addArticle', params)
        .then(res => res.data)
        .catch(e => e)
}

// edit
export function editArticle(params?: any) {
    return ax.put(prefix + '/editArticle', params)
        .then(res => res.data)
        .catch(e => e)
}

// getList
export function getArticleList(params?: any) {
    return ax.post(prefix + '/getArticleList', params)
        .then(res => res.data)
        .catch(e => e)
}

// getDetail
export function getArticleDetail(params?: any) {
    return ax.post(prefix + '/getArticleDetail', params)
        .then(res => res.data)
        .catch(e => e)
}

// updateArtStatus
export function updateArtStatus(params?: any) {
    return ax.post(prefix + '/updateArtStatus', params)
        .then(res => res.data)
        .catch(e => e)
}
