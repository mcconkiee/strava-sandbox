import axios, { AxiosRequestConfig } from 'axios';
import config from '../config';

const tokenEndpoint = "https://www.strava.com/oauth/token";

axios.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request))
  return request
})

export interface RequestOptions {
    access_token: string;
    contentType?: string;
}
export const baseURL = "https://www.strava.com/api/v3";

export const requestConfig = (options: RequestOptions): AxiosRequestConfig => {
    return { baseURL: baseURL , headers: { "Authorization": `Bearer ${options.access_token}`, "Content-Type": (options && options.contentType) ? options.contentType : "application/json" } };
}


export default {
    get: (url: string, options: RequestOptions) => {
        const _config: AxiosRequestConfig = requestConfig(options);
        return axios.get(url, _config);
    },
    post: (url: string, data: object, options: RequestOptions) => {
        const _config: AxiosRequestConfig = requestConfig(options);        
        return axios.post(url, data, _config);
    },
    put: (url: string, data: object, options: RequestOptions) => {
        const _config: AxiosRequestConfig = requestConfig(options);        
        return axios.put(url, data, _config);
    },
    tokenExchange: (code: string) => {
        const data = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: "authorization_code",
            code
        }

        return axios.post(tokenEndpoint, data)
    },
    tokenRefresh: (token: string) => {
        const data = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: "refresh_token",
            refresh_token: token
        }

        return axios.post(tokenEndpoint, data)
    }
}
