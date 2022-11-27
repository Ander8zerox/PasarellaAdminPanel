import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
    
  listUsuarios: Usuario[] = [
    {usuario: "jeco", nombre: 'Juan', apellido: "Jimenez", sexo: 'Masculino'},
    {usuario: "jdaven", nombre: 'Pedro', apellido: "Pueblo", sexo: 'Masculino'},
    {usuario: "mdrival", nombre: 'Pablo', apellido: "Paz", sexo: 'Masculino'},
    {usuario: "pasa2", nombre: 'David', apellido: "Rosas", sexo: 'Masculino'},
    {usuario: "2pasare", nombre: 'Jorge', apellido: "Laudo", sexo: 'Masculino'},
    {usuario: "cam34", nombre: 'Camilo', apellido: "Jimenez", sexo: 'Masculino'},
    {usuario: "div23", nombre: 'Diana', apellido: "Valencia", sexo: 'Femenino'},
    {usuario: "Jimw2", nombre: 'Jimena', apellido: "Williams", sexo: 'Femenino'},
    {usuario: "we34rf", nombre: 'William', apellido: "Ernie", sexo: 'Masculino'},
    {usuario: "Khfd", nombre: 'Krist', apellido: "Bernard", sexo: 'Masculino'},
    {usuario: "DBDutty", nombre: 'Diego', apellido: "Palermo", sexo: 'Masculino'}
  ];

  constructor() { }

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
