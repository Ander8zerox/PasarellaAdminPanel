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
  usuario!:Usuario;
  localSession:any = null != sessionStorage.getItem('LocalInSession')? sessionStorage.getItem('LocalInSession'):"";


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
      idCustomer:0,
      name: this.form.value.nombre,
      document: this.form.value.documento,
      telephone: this.form.value.telefono,
      jobLocalName:this.form.value.local,
      gender: this.form.value.sexo,
      idLocalCreation:this.localSession
    }
    this.usuarioService.agregarusuario(user).subscribe({
      next:response => {
          this.router.navigate(['/dashboard/usuarios']);
          this.mostrarSnackBar('Usuario agregado con exito!');
      }, error: error =>{
        this.mostrarSnackBar('Ocurrio un error al agregar el usuario');
      }
  });

  }

  volver(){
    this.router.navigate(['/dashboard/usuarios']);
  }

  esEditar(){
    
    if(this.id !== null){
      this.titulo="Editar Usuario";
       this.usuarioService.getUsuarioId(this.id).subscribe(
        response=>{
      
          this.usuario = response;
          this.setValuesToForm(this.usuario);
        }
      );
    }
  }

  setValuesToForm(usuario:Usuario){
    this.form.setValue({
      nombre: this.usuario.name,
      documento: this.usuario.document,
      telefono: this.usuario.telephone,
      local: this.usuario.jobLocalName,
      sexo: this.usuario.gender
    })
  }

  editarUsuario(){
    const customer:Usuario = {
      idCustomer:this.usuario.idCustomer,
      name: this.form.value.nombre,
      document: this.form.value.documento,
      telephone: this.form.value.telefono,
      jobLocalName:this.form.value.local,
      gender: this.form.value.sexo,
      idLocalCreation:this.localSession
    }
    this.usuarioService.updateUsuarios(customer.idCustomer,customer).subscribe({
        next:response => {
            this.mostrarSnackBar('Usuario editado con exito!');
            this.router.navigate(['/dashboard/usuarios']);
        }, error: error =>{
          console.log(JSON.stringify(error));
          this.mostrarSnackBar('Ocurrio un error al editar el usuario');
        }
    });
  }

  mostrarSnackBar(message:string){
    this._snackBar.open(message,'',{
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
  }

}
