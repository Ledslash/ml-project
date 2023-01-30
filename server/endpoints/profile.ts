
import {Request, Response} from 'express';

import { UserData, UserRestrictions, UserLevel, FullUserInterface } from '../shared/interfaces';
import { getUserCache, setUserCache } from '../services/user-cache';
const MercadolibreService = require('../../../MercadolibreService/MercadolibreService');


export const profile = async function(_req: Request, res: Response){

    try {
        let user = await getUserCache();
        let levelDescription: UserLevel;
        let userRestrictions: UserRestrictions;
        let userResponse: FullUserInterface;
        if(!user){
            const MLService = new MercadolibreService()
            const user: UserData = await MLService.getUser();

            const promiseCluster = await Promise.all([
                MLService.getUserRestrictions(user.id_usuario),
                MLService.getLevel(user.nivel)])
            
            userRestrictions = promiseCluster[0];
            levelDescription = promiseCluster[1];
            userResponse = {
                ...user,
                levelData: levelDescription,
                restrictionData: userRestrictions
            }
            await setUserCache(userResponse);
            return res.status(200).json(userResponse);
        }

        res.status(200).json(user);
    } catch(e) {
        console.info(e);
    }


}