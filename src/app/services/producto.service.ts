import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  producto!:Producto;

  listProductos:Producto[] = [
    {codigo:"001",nombre:"Mouse inalambrico",precio:"22000"},
    {codigo:"002",nombre:"Teclado inalambrico",precio:"16000"},
    {codigo:"003",nombre:"Diadema inalambrica",precio:"38000"},
    {codigo:"004",nombre:"Monitor",precio:"1500000"},
    {codigo:"005",nombre:"Memoria ram",precio:"48000"},
    {codigo:"006",nombre:"Computador portatil",precio:"3000000"},
    {codigo:"007",nombre:"Disco duro externo",precio:"185000"},
  ]

  constructor() { }
 
  getProductoCodigo(codigo:string){
    this.listProductos.forEach(element => {
      if(element.codigo == codigo){
        this.producto = element;
      }
    });

    return this.producto;
  }
 
  getProductos(){
    return this.listProductos.slice();
  }
}
