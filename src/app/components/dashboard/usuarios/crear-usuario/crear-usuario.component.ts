import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  sexo: any[] = ['Masculino','Femenino'];
  local: any[] = ['101','102','103','104'];
  form:FormGroup;
  id:string|null;
  titulo:string = "Crear Usuario";

  constructor(private fb:FormBuilder,
     private usuarioService:UsuarioService,
     private router: Router,
     private _snackBar: MatSnackBar,
     private aRoute: ActivatedRoute) { 

    this.form = this.fb.group(
      {
        nombre:['',Validators.required],
        documento:['',Validators.required],
        telefono:['',Validators.required],
        local:['',Validators.required],
        sexo:['',Validators.required]
      }
    );

    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarUsuario(){

    const user:Usuario = {
      nombre: this.form.value.nombre,
      documento: this.form.value.documento,
      telefono: this.form.value.telefono,
      local:this.form.value.local,
      sexo: this.form.value.sexo
    }
    this.usuarioService.agregarusuario(user);
    this.router.navigate(['/dashboard/usuarios']);

    this._snackBar.open('Usuario agregado con exito!','',{
      duration:1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
  }

  volver(){
    this.router.navigate(['/dashboard/usuarios']);
  }

  esEditar(){
    
    if(this.id !== null){
      this.titulo="Editar Usuario";
      const usuario:Usuario = this.usuarioService.getUsuarioId(this.id);
      console.log(usuario);
      this.form.setValue({
            nombre: usuario.nombre,
            documento: usuario.documento,
            telefono: usuario.telefono,
            local: usuario.local,
            sexo: usuario.sexo
          })
    }
  }

  editarUsuario(){
    this.router.navigate(['/dashboard/usuarios']);
    this._snackBar.open('Usuario editado con exito!','',{
      duration:1500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
  }

}
