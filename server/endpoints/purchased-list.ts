const MercadolibreService = require('../../../MercadolibreService/MercadolibreService');

import {Request, Response} from 'express';
import { getUserCache, setUserCache } from '../services/user-cache';
import { FullUserInterface, PurchaseList } from '../shared/interfaces';

export const purchasedList = async function(req: Request, res: Response){

    const { offset, limit } = req.body;
    const MLService = new MercadolibreService();

    let userInfo: FullUserInterface = await getUserCache()
    if(!userInfo){
        userInfo = await MLService.getUser();
        await setUserCache(userInfo);
    }

    let puchaseList: PurchaseList = await MLService.getUserPurchases(userInfo.id_usuario, limit, offset);
    puchaseList.itemList = puchaseList.data;
    delete puchaseList.data;

    res.status(200).json(puchaseList);
}