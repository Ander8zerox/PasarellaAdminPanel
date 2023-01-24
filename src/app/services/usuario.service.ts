import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    
  listUsuarios: Usuario[] = [
    {nombre: "Diego Paz", documento: '112345678', telefono: "3232323", local:"101", sexo: 'Masculino'},
    {nombre: "Manuel labrada", documento: '112345679', telefono: "3232323", local:"102", sexo: 'Masculino'},
    {nombre: "Jimena Perez", documento: '112345610', telefono:"3232323", local:"103", sexo: 'Masculino'},
    {nombre: "Maria Mena", documento: '112345611', telefono: "3232323", local:"104", sexo: 'Masculino'},
    {nombre: "Jorge Cardenas", documento: '112345612', telefono: "3232323", local:"105", sexo: 'Masculino'},
    {nombre: "Ivan lalinde", documento: '112345613', telefono: "3232323", local:"106", sexo: 'Masculino'},
    {nombre: "Carlos Pulido", documento: '112345614', telefono: "3232323", local:"107", sexo: 'Femenino'},
    {nombre: "Elena Rodriguez", documento: '112345615', telefono: "3232323", local:"109", sexo: 'Femenino'},
    {nombre: "Alberto Diaz", documento: '112345616', telefono: "3232323", local:"110", sexo: 'Masculino'},
    {nombre: "Laura Tobon", documento: '112345617', telefono: "3232323", local:"111", sexo: 'Masculino'},
    {nombre: "Daniel Hernandez", documento: '112345618', telefono: "3232323", local:"112", sexo: 'Masculino'}
  ];

  usuario!:Usuario;
  constructor() { }

  getUsuarioId(id:string){
    this.listUsuarios.forEach(element => {
      if(element.documento == id){
        this.usuario = element;
      }
    });

    return this.usuario;
  }

  getUsuario(){
    return this.listUsuarios.slice();
  }
  eliminarUsuario(index:number){
    this.listUsuarios.splice(index,1);
  }
  agregarusuario(usuario:Usuario){
    this.listUsuarios.unshift(usuario);
  }
}
