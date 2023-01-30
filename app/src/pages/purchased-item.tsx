import Image from 'next/image'
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import puchasedItemStyles from '../styles/purchased-item.module.css';
import { UserContext } from './_app';


interface PurchasedItemProps {
    item: PurchasedItem,
    paymentStatusData: {
        id_transaccion: number;
        estado: string;
    },
    shipmentStatusData: {
        id_envio: number;
        estado: string;
    }
}

interface PurchasedItem {
    id_compra: number;
    titulo: string;
    precio: {
        total: number,
        moneda: string;
    };
    cantidad: number;
    fecha: string;
    imagen: string;
    vendedor: {
        id: number;
        nickname: string;
    };
    id_transaccion: number;
    id_envio: number;
}


export default function PurchasedItem({ item, paymentStatusData, shipmentStatusData }: PurchasedItemProps) {

    const rejectedPayment = paymentStatusData.estado === 'rechazada';
    const rejectedShipment = shipmentStatusData.estado === 'rechazada';

    return (
        <section className={puchasedItemStyles.mainBodyContent}>
            <div className={puchasedItemStyles.boughItem}>
                <img className={puchasedItemStyles.itemImg} src={item?.imagen}></img>
                <div className="item-details">
                    <h2>{item?.titulo}</h2>
                    <p>Precio: <span className={puchasedItemStyles.priceNumber}>{item?.precio?.total} {item?.precio?.moneda}</span></p>
                    <p>{item?.cantidad} {item?.cantidad > 1 ? 'Unidades' : 'Unidad'}</p>
                    <p>ID de Compra #{item?.id_compra}</p>
                    <p>Vendedor: {item?.vendedor?.nickname}</p>
                    <p>Comprado el {item?.fecha}</p>
                    
                    <p className={ rejectedPayment  ? puchasedItemStyles.paymentStatusGreen : puchasedItemStyles.paymentStatusRed}>
                        Pago {rejectedPayment ? 'Rechazado' : 'Aprobado'}
                    </p>
                    <p className={ rejectedShipment  ? puchasedItemStyles.deliveryStatusGreen : puchasedItemStyles.deliveryStatusRed}>
                        Pago {rejectedShipment ? 'Rechazado' : 'Aprobado'}
                    </p>
                </div>
            </div>
        </section>
    );
}

export async function getServerSideProps(context: any) {
    const { id_trx, id_envio, itemNumber } = context.query;

    const res = await fetch(`http://localho.st:8050/item-info`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            numero_compra: itemNumber
        })
    })
    const purchasedItemDetail = await res.json()

    return { props: purchasedItemDetail }
}