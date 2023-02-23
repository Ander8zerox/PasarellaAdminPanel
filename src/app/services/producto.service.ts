import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  producto!:Producto;
  private baseUrl = 'http://localhost:8080/';

  listProductos:Producto[] = []

  constructor(private http:HttpClient) { }

  crearProducto(producto:Producto):Observable<Producto>{
    return this.http.post<Producto>(this.baseUrl+"productCreation",producto)
  }
 
  getProductoId(id:string):Observable<Producto>{
    return this.http.get<Producto>(this.baseUrl + "productObtainById?idProduct="+id);

  }
 
  getProductos(idLocalCreation:string){
    return this.http.get<Producto[]>(this.baseUrl + "productObtainAll?idLocalCreation="+idLocalCreation);

  }

  updateProducto(id:number,producto:Producto):Observable<Producto>{
    return this.http.put<Producto>(this.baseUrl + "productUpdating/"+id,producto);
  }
}
