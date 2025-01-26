interface IOptions {
    url: string;
    method: any;
    params?: any;
    server?: boolean;
}
export default async function useHttpOnlyClient(options: IOptions) {
   
    const {url, method, params } = options;
    const config = useRuntimeConfig()
    const baseURL = config.public.baseURL;
    const resp = await $fetch(baseURL + url, {
        method: method,
        body: {
          ...params
        }
      })
    return resp;
}