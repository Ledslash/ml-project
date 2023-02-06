import { config } from '../config/config';
import { client } from './redis.service';
import { FullUserInterface } from '../shared/interfaces';
const USER_INFO_KEY = config.REDIS.KEYS.USER_INFO_KEY;
const USE_CACHE = config.REDIS.USE_CACHE;


export const getUserCache = async function(){
    const userInfoRedis = await client.get(USER_INFO_KEY);
    if(userInfoRedis){
        return JSON.parse(userInfoRedis);
    }
    return null;
}

export const setUserCache = async function(userInfo: FullUserInterface){
    await client.set(USER_INFO_KEY, JSON.stringify(userInfo));
}