import config from 'src/config';
import {AUTHCODE_ROUTE, DOGS_AUTHCODE_ROUTE} from '../constants/routes'
const REDIRECT_URL = `${config.host}${AUTHCODE_ROUTE}`
const REDIRECT_URL_DOGS = `${config.host}${DOGS_AUTHCODE_ROUTE}`

export const authURL = (dogs:boolean = false)=>{
    return `https://www.strava.com/oauth/authorize?client_id=${config.client_id}&redirect_uri=${dogs ? REDIRECT_URL_DOGS : REDIRECT_URL}&response_type=code&scope=activity:read_all,activity:write`
}
