import axios from 'axios';
import config from '../config';
import { REFRESH_TOKEN } from 'src/constants/localStorage';
const tokenEndpoint = "https://www.strava.com/oauth/token";
export default {
    get:(url:string)=>{console.log(url);},
    tokenExchange:(code:string)=>{
        const data = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: "authorization_code",
            code
        }

        return axios.post(tokenEndpoint,data)
    },
    tokenRefresh:()=>{
        const token = localStorage.getItem(REFRESH_TOKEN);
        const data = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: "refresh_token",
            refresh_token: token           
        }

        return axios.post(tokenEndpoint,data)
    }
    
}
