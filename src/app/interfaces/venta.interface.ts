import { Item } from "./item.interface";

export interface Venta {
    fecha: string;
    cliente_id: number;
    importe_total: number;
    observaciones: string;
    items?: any;
    id?: number;
}