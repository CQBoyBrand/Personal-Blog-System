import ax from '../api'

const prefix = '/user'

// register
export function register (params: Object) {
    return ax.post(prefix + '/register', params)
        .then(res => res.data)
        .catch(e => e)
}
// login
export function login (params: Object) {
    return ax.post(prefix + '/login', params)
        .then(res => res.data)
        .catch(e => e)
}

// userInfo
export function userInfo (params?: Object) {
    return ax.get(prefix + '/getUserInfo', params)
        .then(res => res.data)
        .catch(e => e)
}
// // updateUserInfo
export function updateUserInfo (params: Object) {
    return ax.put(prefix + '/updateUserInfo', params)
        .then(res => res.data)
        .catch(e => e)
}