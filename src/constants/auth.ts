import config from 'src/config';

export const authURL = ()=>{
    return `https://www.strava.com/oauth/authorize?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}&response_type=code&scope=activity:read_all,activity:write`
}
