import { Redis } from 'ioredis';

const client = new Redis({
    port: 6379,
    host: "127.0.0.1", // Redis host
    username: "", // needs Redis >= 6
    password: "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81",
});


const saveItemsInRedis = async (purchaseList: any, userId: number) => {
    await client.set(`itemList-${userId}`, `${JSON.stringify(purchaseList)}`);
}

export const getItemsInCache = async (userId: number) => {
    const cache = await client.get(`itemList-${userId}`);
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