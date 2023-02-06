import Image from 'next/image'
import { useRouter } from 'next/router'

import purchaseListStyle from '../styles/purchase-list.module.css'
import styles from '../styles/index.module.css'
import { useState } from 'react';
import upArrowSVG from '../assets/upArrow.svg';

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

    const router = useRouter();
    
    const [purchasedItemList, setpurchasedItemList ] = useState<PurchasedItemList[]>(itemList);
    const [purchasedListLimit, setpurchasedListLimit ] = useState<number>(limit);
    const [purchasedListOffset, setpurchasedListOffset ] = useState<number>(offset);

    const getItems = (newOffset: number, newLimit: number) => {

        fetch(`http://localho.st:8050/purchased-list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                offset: newOffset,
                limit: newLimit
            })
        })
        .then(res => res.json())
        .then(json => {
            if(purchasedListLimit !== newLimit){
                setpurchasedListLimit(newLimit);
            }
            if(purchasedListOffset !== newOffset){
                setpurchasedListOffset(newOffset);
            }
            setpurchasedItemList(json.itemList)
        })
    }

    let offsetNumber = offset;
    let options = [];

    const changePaginationLimit = (value: string) => {
        getItems(offset, parseInt(value));
    };

    // Make limit options
    for (let index = 1; index <= total; index++) {
        options.push(<option key={index} value={index} selected={limit === index} >{index}</option>)
    }

    let pagesNumber = Math.ceil(total / purchasedListLimit);
    let paginationButtons = [];

    const changePage = (pageNumber: number) => {
        getItems((pageNumber - 1) * purchasedListLimit, purchasedListLimit)
    }

    const wordLimit = 25;

    const truncateStringSize = (str: string) => {
        return (str.length > wordLimit) ? str.slice(0, wordLimit-1) + ' ...' : str;
    }

    // Make pagination pages
    for (let index = 1; index <= pagesNumber; index++) {
        paginationButtons.push(<div key={index} onClick={() => changePage(index)} className={purchaseListStyle.paginationButton}><p>{index}</p></div>)
    }

    return (
        <>  
            <div className={purchaseListStyle.goUpArrow} onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}) }}>
                <Image alt="Up Arrow" src={upArrowSVG} priority />
            </div>
            <section className={purchaseListStyle.buyItemContent}>
                <div className={purchaseListStyle.limitBox}>
                    <p>Items por Pagina</p>
                    <select onChange={e => changePaginationLimit(e.target.value)}>
                        {options}
                    </select>
                </div>

                <div className={purchaseListStyle.paginationTop}>
                    {paginationButtons}
                </div>

                {purchasedItemList.map((item) => {
                const itemDetailLink = `/purchased-item?id_trx=${item.id_transaccion}&id_envio=${item.id_envio}&itemNumber=${offsetNumber}`;
                offsetNumber++;
                return (
                    <div key={item.id_compra} className={purchaseListStyle.itemContainer}>
                        <img className={purchaseListStyle.productImage} src={item.imagen}></img>
                        <div className={purchaseListStyle.itemDetailInfo}>
                            <h2>{truncateStringSize(item.titulo)}</h2>
                            <p>Precio: <span className={purchaseListStyle.priceNumber}>{item.precio.total} {item.precio.moneda}</span></p>
                            <p>{item.cantidad} {item.cantidad > 1 ? 'Unidades' : 'Unidad'}</p>
                            <p>ID de venta #{item.id_compra}</p>
                            <p>Comprado el {item.fecha}</p>
                        </div>
                        <a className={`${purchaseListStyle.itemMoreDetails} ${styles.blueBtn}`} href={itemDetailLink}>Ver Detalles</a>
                    </div>
                )
                })}
                <div className={purchaseListStyle.pagination}>
                    {paginationButtons}
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context: any) {

    const { offset, limit } = context.query;

    const res = await fetch(`http://localhost:8050/purchased-list`, {
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