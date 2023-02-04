import Image from 'next/image'

import puchasedItemStyles from '../styles/purchased-item.module.css';
import { TruckSVG } from '@/assets/dynamicSVG/truck';
import greenIconSVG from '../assets/greenIcon.svg';
import warningIconSVG from '../assets/warningIcon.svg';

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
        <>
            <div className={puchasedItemStyles.goBackBar}>
                <a href={`/purchase-list`}>Volver al listado</a>
            </div>
            <section className={puchasedItemStyles.mainBodyContent}>
                <div className={puchasedItemStyles.boughtItem}>
                    <img className={puchasedItemStyles.itemImg} src={item?.imagen}></img>
                    <div className={puchasedItemStyles.itemDetails}>
                        <h2 className={puchasedItemStyles.itemTitle}>{item?.titulo}</h2>
                        <p>Precio: <span className={puchasedItemStyles.priceNumber}>{item?.precio?.total} {item?.precio?.moneda}</span></p>
                        <p>{item?.cantidad} {item?.cantidad > 1 ? 'Unidades' : 'Unidad'}</p>
                            

                        <p className={ rejectedPayment  ? puchasedItemStyles.paymentStatusRed : puchasedItemStyles.paymentStatusGreen}>
                            <Image src={ rejectedPayment ? warningIconSVG : greenIconSVG} alt="Icon" priority />
                            Pago {rejectedPayment ? 'Rechazado' : 'Aprobado'}
                        </p>
                        <p className={ rejectedShipment  ? puchasedItemStyles.deliveryStatusRed : puchasedItemStyles.deliveryStatusGreen}>
                            <TruckSVG approved={!rejectedPayment} />
                            Envio {rejectedShipment ? 'Rechazado' : 'Aprobado'}
                        </p>
                    </div>

                    <div className={puchasedItemStyles.itemSaleDetails}>
                        <p>Compra #{item?.id_compra}</p>
                        <p>Vendido por <a href="#" className={puchasedItemStyles.sellerName}>{item?.vendedor?.nickname}</a></p>
                        <p>Comprado el {item?.fecha}</p>
                    </div>
                </div>
            </section>
        </>
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