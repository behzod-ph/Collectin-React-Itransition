import {ENG} from "./language";

// const BACK_HOST = 'collectserver-env.eba-ujipkvzn.us-east-1.elasticbeanstalk.com:8080'
const BACK_HOST = '3.222.113.96:8080'
const FRONT_HOST = '3.222.113.96:3000'
// const BACK_HOST = '127.0.0.1:8080'
// const FRONT_HOST = '127.0.0.1:3000'
// Fixed

export const BASE_URL = 'http://' + BACK_HOST;

export const API_BASE_URL = BASE_URL + '/api/v1';

export const SOCKET_URL = 'ws://' + BACK_HOST + '/socket';


export const OAUTH2_REDIRECT_URI = 'http://' + FRONT_HOST + '/oauth2/redirect'

export const GOOGLE_AUTH_URL = BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;


export const ACCESS_TOKEN = 'access-token';
export const ITEM_DATA = 'item-data';
export const LANGUAGE = 'collect-lang';
export const MODE = 'collect-mode';
export const MODE_LIGHT = 'collect-mode';
export const MODE_DARK = 'collect-mode';
const lan = localStorage.getItem(LANGUAGE)
export const PAGE_AUTHENTICATION = lan === ENG ? 'ᑌ𝘚Eᖇ ᗰᗩᑎᗩGEᗰEᑎT' : 'УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ'
export const PAGE_COLLECTION = lan === ENG ? 'ᑕOᒪᒪEᑕTIOᑎ𝘚' : 'КОЛЛЕКЦИИ'


export const UN_BLOCK = lan === ENG ? 'ACTIVE' : 'АКТИВНЫЙ'
export const BLOCK = lan === ENG ? 'BLOCKED' : 'ЗАБЛОКИРОВАНО'
export const DELETE = lan === ENG ? 'DELETED' : 'УДАЛЕНО'
export const GIVE_PERMISSION = lan === ENG ? 'AUTHORIZE' : 'АВТОРИЗОВАТЬ'
export const GET_PERMISSION = lan === ENG ? 'DISAPPROVE' : 'ОТКАЗАТЬСЯ'