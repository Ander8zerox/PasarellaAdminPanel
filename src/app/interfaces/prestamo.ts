import { Producto } from "./producto";

export interface Prestamo{
    idLending:number;
    dateLending:string;
    customerName:string;
    idCustomer:number;
    jobLocal:string;
    status:string;
    totalAmount:number;
    products:Producto[];
    observation:string;
    idLocalCreation:number;
}