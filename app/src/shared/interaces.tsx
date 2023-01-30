
export interface UserInfo {
    id_usuario: number;
    nombre: string;
    apellido: string;
    nivel: string;
    imagen: string;
    restrictionData: Restriction[],
    levelData: {
      id_nivel: string;
      descripción: string;
    }
}

export interface Restriction{
    tipo: string;
    mensaje: string;
}