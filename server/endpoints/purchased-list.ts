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


/*const MercadolibreService = require('../../../MercadolibreService/MercadolibreService');

import {Request, Response} from 'express';
import { getUserCache, setUserCache } from '../services/user-cache';
import { FullUserInterface, PurchaseList } from '../shared/interfaces';

class Node {
    data: any
    from: any
    to: any
}

const node1 = {
    "data": [
        {
            "id_compra": 300200,
            "titulo": "Celular LG K40",
            "precio": {
                "total": 105000,
                "moneda": "ARS"
            },
            "cantidad": 3,
            "fecha": "2022-07-25T10:23:18.000-03:00",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_969645-MLA46877067884_072021-V.webp",
            "vendedor": {
                "id": 4010,
                "nickname": "FAROCUDR19"
            },
            "id_transaccion": 7010200,
            "id_envio": 1000010200
        },
        {
            "id_compra": 300199,
            "titulo": "Apple iPhone 13 Pro Max 2565gb-incluye Cargador -1 Año Gtia.",
            "precio": {
                "total": 629999.99,
                "moneda": "ARS"
            },
            "cantidad": 1,
            "fecha": "2022-07-25T10:03:18.000-03:00",
            "imagen": "https://http2.mlstatic.com/D_NQ_NP_753104-MLA47778455981_102021-V.webp",
            "vendedor": {
                "id": 4009,
                "nickname": "ELECTROMIAMI123"
            },
            "id_transaccion": 7010199,
            "id_envio": 1000010199
        },
    ],
    "from": 0,
    "to": 1
};

const nodeArray = [node1];


export const purchasedList = async function(req: Request, res: Response){

    /*const { offset, limit } = req.body;
    const MLService = new MercadolibreService();

    let userInfo: FullUserInterface = await getUserCache()
    if(!userInfo){
        userInfo = await MLService.getUser();
        await setUserCache(userInfo);
    }

    let puchaseList: PurchaseList = await MLService.getUserPurchases(userInfo.id_usuario, limit, offset);

    puchaseList.itemList = puchaseList.data;
    delete puchaseList.data;

    res.status(200).json(puchaseList); * /

    const { offset, limit } = req.body;
    let dataToReturn: any;
    
    if(nodeArray){
        for (let index = 0; index < nodeArray.length; index++) {
            
            const node = nodeArray[index];

            if(node.to < offset){
                continue;
            }
            else { // node.to >= offset
                if(node.to >= offset + limit){ // i am overlapped by the node
                    dataToReturn = node.data.slice(offset, offset + limit);
                }
                else { // node.to < offset + limit
                    const newNode = new Node();
                    newNode.from = node.to === offset ? offset + 1 : offset;
        
        
                    const MLService = new MercadolibreService();
        
                    let userInfo: FullUserInterface = await getUserCache()
                    if(!userInfo){
                        userInfo = await MLService.getUser();
                        await setUserCache(userInfo);
                    }
                
                    let puchaseList: PurchaseList = await MLService.getUserPurchases(userInfo.id_usuario, limit, offset);
        
                    console.info("my data", puchaseList.data)
                    dataToReturn = puchaseList;
                    dataToReturn.itemList = dataToReturn.data.slice(0, limit);
        
                    console.info("MY TURN", puchaseList.data.length)
                    newNode.data = puchaseList.data;
                    newNode.to = offset + puchaseList.data.length - 1;

                    const nextNode = nodeArray[index + 1];
                    nodeArray.push(newNode);
                }
                break;
            }
            
        };
    }

    delete dataToReturn.data;
    res.status(200).json({actualReturn: dataToReturn, nodes: nodeArray});
} */