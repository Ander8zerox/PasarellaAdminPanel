import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

form:FormGroup;
horizontalPosition: MatSnackBarHorizontalPosition = 'right';
verticalPosition: MatSnackBarVerticalPosition = 'bottom';
loading = false;

  constructor(private fb:FormBuilder,
              private _snackBar: MatSnackBar, 
              private router:Router,
              private loginService:LoginService) { 
    this.form = this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  ingresar(){
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    console.log(usuario);
    console.log(password);

    this.loginService.getUser(usuario)
      .subscribe(response => {

        const user:any = response;
        if(null != user && password == user.password){
          //Pendiente encriptar 
          sessionStorage.setItem('LocalInSession', user.idLocalCreation);
          this.fakeLoading();
        }else{
          this.error();
          this.form.reset();
        }
        
      }
    );
    
    
  }

  error(){
    this._snackBar.open('Usuario o contraseña ingresados son invalidos','',{
      duration:5000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    })
  }

  fakeLoading(){
    this.loading=true;
    setTimeout(
      ()=>{
        //redireccionar
        this.router.navigate(['dashboard'])},1500
    );
  }
}
