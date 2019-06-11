import * as config from 'src/config';

export const REFRESH_TOKEN = `ericmcconkie.com.strava.REFRESH_TOKEN${config.default.dev ? '_dev' : ''}`;
export const ACCESS_TOKEN = `ericmcconkie.com.strava.ACCESS_TOKEN${config.default.dev ? '_dev' : ''}`;
export const USER = `ericmcconkie.com.strava.USER${config.default.dev ? '_dev' : ''}`;
export const ACCESS_TOKEN_TIMESTAMP = `ericmcconkie.com.strava.ACCESS_TOKEN_TIMESTAMP${config.default.dev ? '_dev' : ''}`;


export const DOG_REFRESH_TOKEN = `ericmcconkie.com.strava.REFRESH_TOKEN_DOG${config.default.dev ? '_dev' : ''}`;
export const DOG_ACCESS_TOKEN = `ericmcconkie.com.strava.ACCESS_TOKEN_DOG${config.default.dev ? '_dev' : ''}`;
