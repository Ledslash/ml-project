
import {Request, Response} from 'express';
import { getItemsInCache } from '../services/item-list-cache';
import MercadolibreService from '../services/mercadolibre-service';

import { getUserCache, setUserCache } from '../services/user-cache';
import { PaymentStatus, ShipmentStatus } from '../shared/interfaces';

export const itemInfo = async function(req: Request, res: Response){
    
    try{
        const MLService = new MercadolibreService();
        
        let userInfo = await getUserCache()
        if(!userInfo){
            userInfo = await MLService.getUser();
            await setUserCache(userInfo);
        }

        let cachedItems: any = await getItemsInCache(userInfo.id_usuario);
        let item;

        if(cachedItems){
            item = cachedItems.itemList.filter( (item: any) => item.id  === req.body.numero_compra)[0];
        }
        else {
            let puchaseList = await MLService.getUserPurchases(userInfo.id_usuario, 1, req.body.numero_compra);
            item = puchaseList.data[0];
        }

        const paymentStatusData: PaymentStatus = await MLService.getPayment(item.id_transaccion);
        const shipmentStatusData: ShipmentStatus = await MLService.getShipment(item.id_envio);

        res.status(200).json({
            item,
            paymentStatusData,
            shipmentStatusData
        });

    } catch(e) {
        console.info(e);
    }
}