import * as dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const APP_NAME = process.env.APP_NAME;
export const APP_HOST = process.env.APP_HOST;
export const APP_URL_PREFIX = process.env.APP_URL_PREFIX;
export const APP_PORT = process.env.APP_PORT;
export const JWT_KEY = process.env.JWT_KEY;
export const HOST_SITE = process.env.HOST_SITE;

export const getUrlServer = () => 
    (NODE_ENV === "production")? 
        `${APP_HOST}/${APP_URL_PREFIX}`: 
        `${APP_HOST}:${APP_PORT}/${APP_URL_PREFIX}`;