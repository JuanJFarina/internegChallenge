export interface Producto {
    nombre: string;
    codigo: string;
    precio: number;
    id: number;
    rubro_id?: number;
    rubro?: any;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
}