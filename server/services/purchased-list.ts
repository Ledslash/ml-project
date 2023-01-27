const MercadolibreService = require('../../../MercadolibreService/MercadolibreService');

import {Request, Response} from 'express';
import { UserData, UserRestrictions, UserLevel } from '../shared/interfaces';


export const purchasedList = async function(req: Request, res: Response){

    const userId = req.params.id
    const MLService = new MercadolibreService()
    const puchaseList: UserData = await MLService.getUserPurchases(userId);

    res.status(200).json(puchaseList);
}