import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  form:FormGroup;
  idProducto:string|null;
  titulo:string = "Crear Producto";
  producto!:Producto;
  localSession:any = null != sessionStorage.getItem('LocalInSession')? sessionStorage.getItem('LocalInSession'):"";


  constructor(
    private productoService:ProductoService,
    private fb:FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { 

    this.form = this.fb.group(
      {
        codigo:['',Validators.required],
        nombre:['',Validators.required],
        precio:['',Validators.required]
      }
    );
    this.idProducto = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  crearProducto(){
    const producto:Producto = {
      idProduct:0,
      name: this.form.value.nombre,
      code: this.form.value.codigo,
      price: this.form.value.precio,
      idLocalCreation:this.localSession
    }

    this.productoService.crearProducto(producto).subscribe({
      next:response => {
          this.mostrarSnackBar('Producto creado con exito!');
          this.router.navigate(['/dashboard/productos']);
      }, error: error =>{
        console.log(JSON.stringify(error));
        this.mostrarSnackBar('Ocurrio un error al crear el producto');
      }
  });
  }

  volver(){
    this.router.navigate(['/dashboard/productos']);
  }

  editarProducto(){  
    const producto:Producto = {
      idProduct:this.producto.idProduct,
      name: this.form.value.nombre,
      code: this.form.value.codigo,
      price: this.form.value.precio,
      idLocalCreation:this.producto.idLocalCreation
    }

    this.productoService.updateProducto(producto.idProduct,producto).subscribe({
      next:response => {
          this._snackBar.open('Producto editado con exito!','',{
            duration:3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          })
          this.router.navigate(['/dashboard/productos']);
      }, error: error =>{
        console.log(JSON.stringify(error));
        this.mostrarSnackBar('Ocurrio un error al editar el producto');
      }
  });
  }

  esEditar(){
    
    if(this.idProducto !== null){
      this.titulo="Editar Producto";
      this.productoService.getProductoId(this.idProducto).subscribe(
        {
          next:respone=>{
            this.producto=respone;
            console.log(this.producto);
            this.form.setValue({
                  codigo: this.producto.code,
                  nombre: this.producto.name,
                  precio: this.producto.price
                })
          },error: error =>{
            this.mostrarSnackBar('Error al cargar la lista de productos');
          }
        }
      );
    }
  }

  mostrarSnackBar(message:string){
    this._snackBar.open(message,'',{
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
  }

}
