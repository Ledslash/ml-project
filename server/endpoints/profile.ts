
import {Request, Response} from 'express';

import { UserRestrictions, UserLevel, FullUserInterface } from '../shared/interfaces';
import { getUserCache, setUserCache } from '../services/user-cache';
import MercadolibreService from '../services/mercadolibre-service';


export const profile = async function(_req: Request, res: Response){

    try {
        let userData: FullUserInterface = await getUserCache();
        let MLService = new MercadolibreService()

        let levelDescription: UserLevel;
        let userRestrictions: UserRestrictions;

        if(!userData){
            userData = await MLService.getUser();
        }
        if(!userData.levelData || !userData.restrictionData){

            const promiseCluster = await Promise.all([
                MLService.getUserRestrictions(userData.id_usuario),
                MLService.getLevel(userData.nivel)])
            
            userRestrictions = promiseCluster[0];
            levelDescription = promiseCluster[1];
            userData = {
                ...userData,
                levelData: levelDescription,
                restrictionData: userRestrictions
            }
        }
        setUserCache(userData);
        res.status(200).json(userData);
    } catch(e) {
        console.info(e);
    }
}