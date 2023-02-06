export = {
    REDIS: {
        USE_CACHE: process.env.USE_CACHE,
        PORT: process.env.REDIS_PORT,
        HOST: process.env.REDIS_HOST,
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD,
        KEYS: {
            USER_INFO_KEY: process.env.USER_INFO_KEY,
            ITEM_LIST_KEY: process.env.ITEM_LIST_KEY,
        }
    },
    EXPRESS: {
        PORT: process.env.PORT,
        ALLOW_CORS: process.env.ALLOW_CORS
    }
}