import axios, { AxiosRequestConfig } from 'axios';
import config from '../config';
import { REFRESH_TOKEN, ACCESS_TOKEN } from 'src/constants/localStorage';
const tokenEndpoint = "https://www.strava.com/oauth/token";

export const requestConfig = (): AxiosRequestConfig => {
    const access_token = localStorage.getItem(ACCESS_TOKEN)
    return { baseURL: "https://www.strava.com/api/v3", headers: { "Authorization": `Bearer ${access_token}`, "Content-Type": "application/json" } };
}
export default {
    get: (url: string) => {
        const _config: AxiosRequestConfig = requestConfig();
        return axios.get(url, _config);
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
