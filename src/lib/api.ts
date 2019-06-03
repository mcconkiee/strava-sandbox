import axios, { AxiosRequestConfig } from 'axios';
import config from '../config';
import { REFRESH_TOKEN, ACCESS_TOKEN, DOG_ACCESS_TOKEN } from 'src/constants/localStorage';
const tokenEndpoint = "https://www.strava.com/oauth/token";

export const requestConfig = (dogs:boolean = false): AxiosRequestConfig => {
    const access_token = localStorage.getItem(dogs ? DOG_ACCESS_TOKEN :ACCESS_TOKEN)
    return { baseURL: "https://www.strava.com/api/v3", headers: { "Authorization": `Bearer ${access_token}`, "Content-Type": "application/json" } };
}

export const requestConfigAPI = (): AxiosRequestConfig => {    
    const userToken = localStorage.getItem(ACCESS_TOKEN)
    return { baseURL: config.apiurl, headers:  {"Content-Type": "application/json" , "Authorization": `Bearer ${userToken}`} };
}
export default {
    get: (url: string) => {
        const _config: AxiosRequestConfig = requestConfig();
        return axios.get(url, _config);
    },
    getApi: (url: string) => {
        const _config: AxiosRequestConfig = requestConfigAPI();
        return axios.get(url, _config);
    },
    post: (url: string, data: object, dogs:boolean = false) => {
        const _config: AxiosRequestConfig = requestConfig(dogs);        
        return axios.post(url, data, _config);
    },
    postApi: (url: string, data: object, dogs:boolean = false) => {
        const _config: AxiosRequestConfig = requestConfigAPI();
        return axios.post(url, data, _config);
    },
    put: (url: string, data: object) => {
        const _config: AxiosRequestConfig = requestConfig();
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
    tokenRefresh: () => {
        const token = localStorage.getItem(REFRESH_TOKEN);
        const data = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: "refresh_token",
            refresh_token: token
        }

        return axios.post(tokenEndpoint, data)
    }
}
