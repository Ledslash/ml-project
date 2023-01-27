const MercadolibreService = require('../../../MercadolibreService/MercadolibreService');

import {Request, Response} from 'express';


export const purchasedItemStatus = async function(req: Request, res: Response){

    const MLService = new MercadolibreService();

    const paymentStatusData: any = await MLService.getPayment(req.body.id_transaccion);
    const shipmentStatusData: any = await MLService.getShipment(req.body.id_envio);

    res.status(200).json({
        paymentStatusData,
        shipmentStatusData
    });

}