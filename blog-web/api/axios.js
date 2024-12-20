
const IS_DEV = process.env.NODE_ENV !== 'production'
const baseURL = IS_DEV ? 'http://localhost:3002' : 'http://api.brandhuang.com/frontend';

export async function post(url, data = null) {
  return useFetch(baseURL + url, {
    method: 'POST',
    body: data ? JSON.stringify(data) : null
  }).then( res => {
    return res.data.value;
  })
}

export async function get(url, data = null) {
  return useFetch(baseURL + url, {
    method: 'GET',
    body: data ? JSON.stringify(data) : null
  }).then( res => {
    return res.data.value;
  })
}

// import axios from 'axios'
//  // API请求地址
// //axios.defaults.baseURL = process.env.API_ROOT
// const IS_DEV = process.env.NODE_ENV !== 'production'
// axios.defaults.baseURL = IS_DEV ? 'http://localhost:3002' : 'http://api.brandhuang.com/frontend'

// // 请求超时
// //axios.defaults.timeout = 5000

// // 公共请求参数
// const commonParam = {

// }

// // 拦截请求
// axios.interceptors.request.use(
//   req => {
//       return req
//   },
//   err => {
//       return err
//   }
// )

// // 拦截响应
// axios.interceptors.response.use(
//   res => {
//     return res
//   },
//   err => {
//     return err
//   }
// )


// // post方法
// export function post(url, data = {} ) {
//   let params = Object.assign(data, commonParam);
//   return new Promise((resolve, reject) => {
//     axios.post(url, params)
//       .then(response => {
//         resolve(response)
//       }, err => {
//         reject(err)
//       })
//   })
// }

// // get方法
// export function get(url, data = {} ) {
//   let params = Object.assign(data, commonParam);
//   return new Promise((resolve, reject) => {
//     axios.get(url, params)
//       .then(response => {
//         resolve(response)
//       }, err => {
//         reject(err)
//       })
//   })
// }
