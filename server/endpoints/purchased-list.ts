const MercadolibreService = require('../../../MercadolibreService/MercadolibreService');

import {Request, Response} from 'express';
import { getUserCache, setUserCache } from '../services/user-cache';
import { FullUserInterface, PurchaseList } from '../shared/interfaces';

import { getItemsInCache, saveItemsInCache } from '../services/item-list-cache';


export const purchasedList = async function(req: Request, res: Response){

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

        if(cachedGroup.itemList.length === limit){
            cachedGroup.total = cachedItems.total;

            return res.status(200).json(cachedGroup);
        }
    }

    let puchaseList: PurchaseList = await MLService.getUserPurchases(userInfo.id_usuario, limit, offset);
    puchaseList.itemList = puchaseList.data;
    delete puchaseList.data;

    saveItemsInCache(puchaseList, userInfo.id_usuario);

    return res.status(200).json(puchaseList);
}