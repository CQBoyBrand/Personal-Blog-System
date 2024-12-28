interface IOptions {
    url: string;
    method: any;
    params?: any;
}
export default async function useHttp(options: IOptions) {
    const {url, method, params} = options;
    const config = useRuntimeConfig()
    const baseURL = config.public.baseURL;
    const {data, error} = await useFetch(baseURL + url, {
        method: method,
        // body: params ? JSON.stringify(params) : null,
        onRequest: ({ request, options }) => {
            // console.log("request=", request)
            // console.log("options=", options)
            options.body = params
        },
        onResponse: ({ response }) => {
            // console.log("response=", response)
            // return response;
        },
        onRequestError({ request, options, error }) {
            // 处理请求错误
            // console.warn('request error', error);
            // showToast('Request Error');
        },
        onResponseError({ request, response, options }) {
            // 处理响应错误
            // console.warn('request error', response);
            // showToast('Request Error');
        },
    })
    return data.value;
}