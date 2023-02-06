import MercadolibreService from '../services/mercadolibre-service';

import {Request, Response} from 'express';
import { getUserCache, setUserCache } from '../services/user-cache';
import { FullUserInterface, PurchaseList } from '../shared/interfaces';

import { getItemsInCache, saveItemsInCache } from '../services/item-list-cache';

import { config } from '../config/config';

export const purchasedList = async function(req: Request, res: Response){
    try {
        const { offset, limit } = req.body;


        const MLService = new MercadolibreService();

        let userInfo: FullUserInterface = await getUserCache()
        if(!userInfo){
            userInfo = await MLService.getUser();
            await setUserCache(userInfo);
        };

        let cachedItems: any = await getItemsInCache(userInfo.id_usuario);

        if(cachedItems){
            let cachedGroup = {
                offset: offset,
                limit: limit,
                total: cachedItems.total,
                itemList: []
            }
            
            cachedGroup.itemList = cachedItems.itemList.filter( (item: any) => item.id  >= offset && item.id < offset + limit);
            
            const lastElement: any = cachedGroup.itemList[cachedGroup.itemList.length - 1]; // check for last page
            if(cachedGroup.itemList.length === limit || lastElement.id + 1 === cachedGroup.total){
                console.info("is equal");
                return res.status(200).json(cachedGroup);
            }
        }

        let puchaseList: PurchaseList = await MLService.getUserPurchases(userInfo.id_usuario, limit, offset);

        console.info("called services", puchaseList)

        puchaseList.itemList = puchaseList.data;
        delete puchaseList.data;

        saveItemsInCache(puchaseList, userInfo.id_usuario);

        puchaseList.itemList = puchaseList.itemList?.filter( (item: any, index: number) =>  index < limit);
        
        return res.status(200).json(puchaseList);
    } catch(e) {
        console.info(e);
        res.status(500).send('Error');
    }
}