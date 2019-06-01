import axios, { AxiosRequestConfig } from 'axios';
import config from '../../config';

const tokenEndpoint = "https://www.strava.com/oauth/token";

export const requestConfig = (access_token?:string): AxiosRequestConfig => {
    return { baseURL: "https://www.strava.com/api/v3", headers: { "Authorization": `Bearer ${access_token}`, "Content-Type": "application/json" } };
}
export interface RequestOptions {
    access_token:string;
}

export default {
    get: (url: string, options?:RequestOptions) => {
        const _config: AxiosRequestConfig = requestConfig(options ? options.access_token : "xxx");
        return axios.get(url, _config);
    },
    post: (url: string, data: object, options?:RequestOptions) => {
        const _config: AxiosRequestConfig = requestConfig(options ? options.access_token : "xxx");
        return axios.post(url, data, _config);
    },
    put: (url: string, data: object, options?:RequestOptions) => {
        const _config: AxiosRequestConfig = requestConfig(options ? options.access_token : "xxx");
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
    tokenRefresh: (token:string) => {        
        const data = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: "refresh_token",
            refresh_token: token
        }

        return axios.post(tokenEndpoint, data)
    }
}
