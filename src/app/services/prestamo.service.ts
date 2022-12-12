import { Injectable } from '@angular/core';
import { Prestamo } from '../interfaces/prestamo';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  listPrestamos: Prestamo[] = [
      {
        fechaPrestamo:"22-02-12",
        nombreCliente:"Juan Goez",
        local:"104",
        detalle:"Cable usb 3.0",
        estado:"Pendiente",
        observacion:"Se entrega en caja azul"
      },
      {
        fechaPrestamo:"22-02-11",
        nombreCliente:"Diego Meneses",
        local:"101",
        detalle:"Mouse inalambrico",
        estado:"Cerrado",
        observacion:"Se entrega en caja verde"
      },
      {
        fechaPrestamo:"05-02-11",
        nombreCliente:"Viviana Savina",
        local:"203",
        detalle:"Teclado inalambrico",
        estado:"Abierto",
        observacion:"Se entrega en caja amarilla"
      },
      {
        fechaPrestamo:"16-02-13",
        nombreCliente:"Fabio Rivera",
        local:"204",
        detalle:"Torre ultra",
        estado:"Pendiente",
        observacion:"Se entrega en caja naranja"
      },
      {
        fechaPrestamo:"22-12-13",
        nombreCliente:"Jimena Jimenez",
        local:"145",
        detalle:"Monitor ultra",
        estado:"Cerrado",
        observacion:"Se entrega en caja Beige"
      },
      {
        fechaPrestamo:"21-11-10",
        nombreCliente:"Eduardo Prieto",
        local:"332",
        detalle:"Case ultra",
        estado:"Cerrado",
        observacion:"Se entrega en caja Vinotinto"
      }
  ];
  constructor() { }

  getPrestamo(){
    return this.listPrestamos.slice();
  }
}
