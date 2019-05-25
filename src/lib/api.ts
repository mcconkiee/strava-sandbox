import axios from 'axios';
import config from '../config';

export default {
    get:(url:string)=>{console.log(url);},
    token:(code:string)=>{
        const data = {
            client_id: config.client_id,
            client_secret: config.client_secret,
            grant_type: "authorization_code",
            code
        }

        return axios.post(`https://www.strava.com/oauth/token`,data)
    }
}
