import { Cliente } from "./cliente.interface";

export interface Venta {
    fecha: string;
    cliente_id: number;
    cliente?: Cliente;
    importe_total: number;
    observaciones: string;
    items?: any;
    id?: number;
}