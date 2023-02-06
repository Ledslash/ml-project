import Image from 'next/image'

import puchasedItemStyles from '../styles/purchased-item.module.css';
import { TruckSVG } from '@/assets/dynamicSVG/truck';
import greenIconSVG from '../assets/greenIcon.svg';
import warningIconSVG from '../assets/warningIcon.svg';
import { config } from '../config/config';

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
    error?: string
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


export default function PurchasedItem({ item, paymentStatusData, shipmentStatusData, error }: PurchasedItemProps) {

    if(error){
        throw new Error(error);
    }

    const rejectedPayment = paymentStatusData.estado === 'rechazada';
    const rejectedShipment = shipmentStatusData.estado === 'rechazada';

    return (
        <>
            <div className={puchasedItemStyles.goBackBar}>
                <a href={`/purchase-list?offset=0&limit=10`}>Volver al listado</a>
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
                            <TruckSVG approved={!rejectedShipment} />
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

    try{
        const { itemNumber } = context.query;

        const SSR_HOST = config.default.BACKEND.SSR_HOST;
        const PORT = config.default.BACKEND.PORT;
        const ITEM_INFO_PATH = config.default.BACKEND.SERVICE_PATHS.ITEM_INFO;

        const res = await fetch(`${SSR_HOST}:${PORT}/${ITEM_INFO_PATH}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numero_compra: parseInt(itemNumber, 10)
            })
        })
        if(res.status === 500){
            throw new Error("Service Error");
        }
        const purchasedItemDetail = await res.json();
        return { props: purchasedItemDetail }
    } catch (e: any){
        return { props: {error: e.message} }
    }
}