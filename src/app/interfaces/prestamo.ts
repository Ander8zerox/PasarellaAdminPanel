import { Producto } from "./producto";

export interface Prestamo{
    idPrestamo:string;
    fechaPrestamo:string;
    nombreCliente:string;
    local:string;
    estado:string;
    valor:string;
    detalle:Producto[];
    observacion:string;
}