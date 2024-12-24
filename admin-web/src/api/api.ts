import axios from "axios";
import type {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig} from "axios";

export interface IResult<T = any> {
    code: number;
    message: string;
    data: T
}
const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
});
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    let token = sessionStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    return config;
}, (error: AxiosError) => {
    return Promise.reject(error);
});
axiosInstance.interceptors.response.use((res: AxiosResponse) => {
    return res;
}, (error: AxiosError) => {
    console.log("error", error)
    return Promise.reject(error);
});

class HttpRequest {
    request<T = any>(config: AxiosRequestConfig): Promise<IResult<T>> {
        return new Promise((resolve, reject) => {
            axiosInstance
            .request<T, AxiosResponse>(config)
            .then((res: AxiosResponse<IResult>) => {
                resolve(res as unknown as IResult<T>);
            })
            .catch((err) => {
                console.log("err", err)
                reject(err)
            })
        });
    }
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<IResult<T>>{
        return this.request({
            url,
            data: {
                ...config
            },
            method: "GET"
        })
    }
    post<T = any>(url: string, config?: AxiosRequestConfig): Promise<IResult<T>>{
        return this.request({
            url,
            data: {
                ...config
            },
            method: "POST"
        })
    }
    put<T = any>(url: string, config: AxiosRequestConfig): Promise<IResult<T>>{
        return this.request({
            url,
            data: {
                ...config
            },
            method: "PUT"
        })
    }
}

export default new HttpRequest();