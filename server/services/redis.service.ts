import { Redis } from 'ioredis';
import { config } from '../config/config';

const REDIS = config.REDIS;
const USE_CACHE = config.REDIS.USE_CACHE === "true";

console.info("using cache", USE_CACHE);

let client: any;

if(USE_CACHE){
    client = new Redis({
        port: REDIS.PORT,
        host: REDIS.HOST,
        username: REDIS.USERNAME,
        password: REDIS.PASSWORD
    });
}
else {
    client = {
        get: () => null,
        set: () => null
    }
}

export {client}