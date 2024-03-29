import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    
  listUsuarios: Usuario[] = [];

  usuario!:Usuario;
  //private baseUrl = 'http://localhost:8080/';
  private baseUrl = 'https://pasarelabackend.fly.dev/'; 

  constructor(private http:HttpClient) { }

  
  agregarusuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(this.baseUrl+"customerCreation",usuario)
  }

  getUsuarioId(id:string):Observable<Usuario>{

      return this.http.get<Usuario>(this.baseUrl + "customerObtainById?idCustomer="+id);

  }

  getUsuarios(idLocalCreation:string):Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.baseUrl + "customerObtainAll?idLocalCreation="+idLocalCreation);
  }

  updateUsuarios(id:number,usuario:Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(this.baseUrl + "customerUpdating/"+id,usuario);
  }

  eliminarUsuario(index:number){
    this.listUsuarios.splice(index,1);
  }
}
