import { Injectable } from '@angular/core';
import { Prestamo } from '../interfaces/prestamo';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  
  listProductos: Producto[] = [
    {
      nombre:"Mouse inalambrico",
      codigo:"002",
      precio:"35000"
    },
    {
      nombre:"Teclado inalambrico",
      codigo:"003",
      precio:"40000"
    },
    {
      nombre:"Monitor",
      codigo:"004",
      precio:"230000"
    }
  ];

  listPrestamos: Prestamo[] = [
      {
        idPrestamo:"p001",
        fechaPrestamo:"22 ene 2023, 7:57:04",
        nombreCliente:"Juan Goez",
        local:"104",
        estado:"Pendiente",
        valor:"50000",
        detalle:this.listProductos,
        observacion:"Se entrega en caja azul"
      },
      {
        idPrestamo:"p002",
        fechaPrestamo:"22 nov 2022, 7:57:04",
        nombreCliente:"Diego Meneses",
        local:"101",
        estado:"Cerrado",
        valor:"300000",
        detalle:this.listProductos,
        observacion:"Se entrega en caja verde"
      },
      {
        idPrestamo:"p003",
        fechaPrestamo:"22 dic 2022, 7:57:04",
        nombreCliente:"Viviana Savina",
        local:"203",
        estado:"Cancelado",
        valor:"39000",
        detalle:this.listProductos,
        observacion:"Se entrega en caja amarilla"
      },
      {
        idPrestamo:"p004",
        fechaPrestamo:"22 mar 2022, 7:57:04",
        nombreCliente:"Fabio Rivera",
        local:"204",
        estado:"Pendiente",
        valor:"25000",
        detalle:this.listProductos,
        observacion:"Se entrega en caja naranja"
      },
      {
        idPrestamo:"p005",
        fechaPrestamo:"03 abr 2022, 8:57:04",
        nombreCliente:"Jimena Jimenez",
        local:"145",
        estado:"Cerrado",
        valor:"15000",
        detalle:this.listProductos,
        observacion:"Se entrega en caja Beige"
      },
      {
        idPrestamo:"p006",
        fechaPrestamo:"22 jul 2022, 9:57:04",
        nombreCliente:"Eduardo Prieto",
        local:"332",
        estado:"Cerrado",
        valor:"30000",
        detalle:this.listProductos,
        observacion:"Se entrega en caja Vinotinto"
      }
  ];
  constructor() { }

  getPrestamo(){
    return this.listPrestamos.slice();
  }
}
