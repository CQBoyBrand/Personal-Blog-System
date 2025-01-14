import { message } from "antd";
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
    if (error.status === 401) {
        message.error('token过期，请重新登录')
        sessionStorage.clear()
        sessionStorage.clear()
        window.location.href = '/login'
    }
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
                reject(err)
            })
        });
    }
    get<T = any>(url: string, params?: AxiosRequestConfig, options?: any): Promise<IResult<T>>{
        return this.request({
            url,
            data: params,
            ...options,
            method: "GET"
        })
    }
    post<T = any>(url: string, params?: AxiosRequestConfig, options?: any): Promise<IResult<T>>{
        return this.request({
            url,
            data: params,
            ...options,
            method: "POST"
        })
    }
    put<T = any>(url: string, params: AxiosRequestConfig,options?: any): Promise<IResult<T>>{
        return this.request({
            url,
            data: params,
            ...options,
            method: "PUT"
        })
    }
}

export default new HttpRequest();