import Image from 'next/image'
import { useRouter } from 'next/router'

import purchaseListStyle from '../styles/purchase-list.module.css'
import styles from '../styles/index.module.css'
import { useContext } from 'react';
import { UserContext } from './_app';

interface PurchasedItemList {
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

interface Props {
    total: number;
    offset: number;
    limit: number;
    itemList: PurchasedItemList[]
}

export default function PurchaseList({ total, offset, limit, itemList }: Props) {

    let offsetNumber = offset;

    return (
        <section className={purchaseListStyle.buyItemContent}>
            {itemList.map((item) => {
            const itemDetailLink = `/purchased-item?id_trx=${item.id_transaccion}&id_envio=${item.id_envio}&itemNumber=${offsetNumber}`;
            offsetNumber++;
            return (
                <div key={item.id_compra} className={purchaseListStyle.itemContainer}>
                    <img className={purchaseListStyle.productImage} src={item.imagen}></img>
                    <div>
                        <h2>{item.titulo}</h2>
                        <p>Precio: <span className={purchaseListStyle.priceNumber}>{item.precio.total} {item.precio.moneda}</span></p>
                        <p>{item.cantidad} {item.cantidad > 1 ? 'Unidades' : 'Unidad'}</p>
                        <p>ID de venta #{item.id_compra}</p>
                        <p>Comprado el {item.fecha}</p>
                    </div>
                    <div className={purchaseListStyle.itemMoreDetails}>
                        <a href={itemDetailLink} className={styles.blueBtn}>Ver Detalles</a>
                    </div>
                </div>
            )
            })}
        </section>
    )
}

export async function getServerSideProps(context: any) {

    const { offset, limit } = context.query;

    const res = await fetch(`http://localho.st:8050/purchased-list`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            offset,
            limit
        })
    });
    const purchasedItemsList = await res.json()
    return { props: purchasedItemsList }
}