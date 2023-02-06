import { Redis } from 'ioredis';
import { FullUserInterface } from '../shared/interfaces';

const client = new Redis({
        port: 6379,
        host: "127.0.0.1", // Redis host
        username: "", // needs Redis >= 6
        password: "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81",
});

export const getUserCache = async function(){
    const userInfoRedis = await client.get('userInfo');

    if(userInfoRedis){
        return JSON.parse(userInfoRedis);
    }
    return null;
}

export const setUserCache = async function(userInfo: FullUserInterface){
    await client.set('userInfo', JSON.stringify(userInfo));
}