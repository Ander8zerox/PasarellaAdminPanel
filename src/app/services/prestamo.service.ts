import { Injectable } from '@angular/core';
import { Prestamo } from '../interfaces/prestamo';
import { Producto } from '../interfaces/producto';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  prestamo!:Prestamo;
  private baseUrl = 'http://localhost:8080/';

  listProductos: Producto[] = [];

  listPrestamos: Prestamo[] = [];
  constructor(private http:HttpClient) { }
//lendingsObtainByDate?date=19 feb 2023, 7:36:24&idLocalCreation=2
  getPrestamo(){
    return this.listPrestamos.slice();
  }

  getPrestamosFechaYLocalCreacion(date:string,idLocalCreation:number){
    return this.http.get<Prestamo[]>(this.baseUrl + "lendingsObtainByDate?date="+date+"&idLocalCreation="+idLocalCreation);

  }
}
