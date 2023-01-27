const MercadolibreService = require('../../../MercadolibreService/MercadolibreService');

import {Request, Response} from 'express';
import { UserData, UserRestrictions, UserLevel } from '../shared/interfaces';


export const profile = async function(_req: Request, res: Response){


    const MLService = new MercadolibreService()
    const user: UserData = await MLService.getUser();

    const promiseCluster = await Promise.all([
        MLService.getUserRestrictions(user.id_usuario),
        MLService.getLevel(user.nivel)])
    
    const userRestrictions: UserRestrictions = promiseCluster[0];
    const levelDescription: UserLevel = promiseCluster[1];

    
    const userResponse = {
        ...user,
        levelData: levelDescription,
        restrictionData: userRestrictions,
    }

    console.info(user);
    console.info("this is all", promiseCluster);

    res.status(200).json(userResponse);


}