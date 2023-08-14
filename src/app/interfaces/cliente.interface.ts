export interface Cliente {
    nombre: string;
    cuit: string;
    id: number;
    cuit_formateado?: string;
    email?: string;
    domicilio?: string;
    telefono?: string;
    created_at?: string;
    updated_at?: string;
}