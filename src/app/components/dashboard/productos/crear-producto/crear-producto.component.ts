import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  form:FormGroup;
  codigo:string|null;
  titulo:string = "Crear Producto";

  constructor(
    private productoService:ProductoService,
    private fb:FormBuilder,
    private router: Router,
    private aRoute: ActivatedRoute
  ) { 

    this.form = this.fb.group(
      {
        codigo:['',Validators.required],
        nombre:['',Validators.required],
        precio:['',Validators.required]
      }
    );
    this.codigo = this.aRoute.snapshot.paramMap.get('codigo');
  }

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProducto(){

  }

  volver(){
    this.router.navigate(['/dashboard/productos']);
  }

  editarProducto(){

  }

  esEditar(){
    
    if(this.codigo !== null){
      this.titulo="Editar Producto";
      const producto:Producto = this.productoService.getProductoCodigo(this.codigo);
      console.log(producto);
      this.form.setValue({
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio
          })
    }
  }

}
