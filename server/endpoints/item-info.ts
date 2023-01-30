
import {Request, Response} from 'express';

const MercadolibreService = require('../../../MercadolibreService/MercadolibreService');
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

        let puchaseList = await MLService.getUserPurchases(userInfo.id_usuario, 1, req.body.numero_compra);

        const item = puchaseList.data[0];
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