interface IOptions {
    url: string;
    method: any;
    params?: any;
    cache?: any;
}
export default async function useHttp(options: IOptions) {
   
    const {url, method, params, cache} = options;
    const config = useRuntimeConfig()
    const baseURL = config.public.baseURL;
    const {data, error}: any = await useFetch(baseURL + url, {
        method: method,
        server: cache,
        // body: params ? JSON.stringify(params) : null,
        onRequest: ({ request, options }) => {
            options.body = params
        },
        onResponse: ({ response }) => {
            // console.log("response=", response._data)
            if (response?._data?.code !== 200) {
                throw createError({ statusCode: response?._data.code, statusMessage: response?._data.message })
            }
            return response;
        },
        onRequestError({ request, options, error }) {
            // 处理请求错误
            // console.warn('request error', error);
            // showToast('Request Error');
        },
        onResponseError({ request, response, options }) {
            // 处理响应错误
            // console.warn('response error', response);
            throw createError({ statusCode: response.status, statusMessage: response.statusText })
            // showToast('Request Error');
        },
    })
    // console.log('data=', data)
    // console.log('error=', error)
    if (data?.value && data?.value?.code !== 200) {
        throw createError({ statusCode: data.value.code, statusMessage: data.value.message })
    }
    return data.value;
}