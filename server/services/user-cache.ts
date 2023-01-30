import { createClient } from 'redis';
import { FullUserInterface } from '../shared/interfaces';

const client = createClient({
    url: 'redis://:eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81@127.0.0.1:6379'
});

export const getUserCache = async function(){
    await client.connect();
    const userInfoRedis = await client.get('userInfo');

    client.quit();
    
    if(userInfoRedis){
        return JSON.parse(userInfoRedis);
    }
    return null;
}

export const setUserCache = async function(userInfo: FullUserInterface){
    await client.connect();
    client.quit();
    return client.set('userInfo', JSON.stringify(userInfo));
}