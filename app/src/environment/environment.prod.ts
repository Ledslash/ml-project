export default {
    BACKEND: {
        HOST: process.env.HOST,
        SSR_HOST: process.env.SSR_HOST,
        PORT: process.env.BACKEND_PORT,
        SERVICE_PATHS: {
            PROFILE: process.env.PROFILE,
            PURCHASE_LIST: process.env.PURCHASE_LIST,
            ITEM_INFO: process.env.ITEM_INFO,
        }
    }
}