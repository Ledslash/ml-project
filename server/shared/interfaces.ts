export interface UserData {
    id_usuario: number;
    nombre: string;
    apellido: string;
    nivel: string;
    imagen: string;
}

export interface UserRestrictions {
    tipo: string;
    mensaje: string;
}

export interface UserLevel {
    id_nivel: string;
    descripción: string;
}

export interface FullUserInterface extends UserData {
    levelData: UserLevel;
    restrictionData: UserRestrictions;
}
export interface PurchaseList {
    total: string;
    offset: string;
    limit: string;
    data?: PurchaseItem
    itemList?: PurchaseItem
}
export interface PurchaseItem {
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

export interface PaymentStatus {
    id_transaccion: number;
    estado: string;
}

export interface ShipmentStatus {
    id_envio: number;
    estado: string;
}