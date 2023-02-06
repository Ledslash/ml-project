import { config } from '../config/config';
import { client } from './redis.service';
const ITEM_LIST_KEY = config.REDIS.KEYS.ITEM_LIST_KEY;

const saveItemsInRedis = async (purchaseList: any, userId: number) => {
    await client.set(`${ITEM_LIST_KEY}-${userId}`, `${JSON.stringify(purchaseList)}`);
}

export const getItemsInCache = async (userId: number) => {
    const cache = await client.get(`${ITEM_LIST_KEY}-${userId}`);
    if(cache){
        return JSON.parse(cache);
    }
    return null;
}

export const saveItemsInCache = async (purchaseList: any, userId: number) => {

    const cachedItems = await getItemsInCache(userId);

    for (let index = 0; index < purchaseList.itemList.length; index++) {
        purchaseList.itemList[index].id = purchaseList.offset + index;

        if(cachedItems){
            const item = purchaseList.itemList[index];
            const assignedIndex = findIndex(cachedItems, item);

            if(cachedItems.itemList[assignedIndex].id === item.id){
                continue;
            }
            else {
                cachedItems.itemList.splice(assignedIndex, 0, item);
            }
        }
    }

    if(cachedItems){
        saveItemsInRedis(cachedItems, userId);
    } else {
        saveItemsInRedis(purchaseList, userId);
    }
}

function findIndex(cachedList: any, item: any) {
	let low = 0
	let high = cachedList.itemList.length;

	while (low < high) {
		var mid = low + high >>> 1;
		if (cachedList.itemList[mid].id < item.id) low = mid + 1;
		else high = mid;
	}
	return low;
}