import { Producto } from "./producto";

export interface Prestamo{
    idLending:number;
    dateLending:string;
    customerName:string;
    idCustomer:number;
    status:string;
    totalAmount:string;
    products:Producto[];
    observation:string;
    idLocalCreation:number;
}