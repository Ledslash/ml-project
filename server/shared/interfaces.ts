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