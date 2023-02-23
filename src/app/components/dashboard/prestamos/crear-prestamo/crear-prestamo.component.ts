import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators'; 
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crear-prestamo',
  templateUrl: './crear-prestamo.component.html',
  styleUrls: ['./crear-prestamo.component.css']
})
export class CrearPrestamoComponent implements OnInit {
  
  form:FormGroup;
  nombreCliente = new FormControl('');
  producto =  new FormControl('');
  local:string="";
  codigo = new FormControl('');
  precio = new FormControl('');
  total = new FormControl('');
  observacion=  new FormControl('');
  titulo:string = "Crear Prestamo";
  listUsuarios: Usuario[]=[];
  listProductos: Producto[]=[];
  listPrestamo:Producto[]=[];
  filteredOptions!: Observable<Usuario[]>;
  filteredProductOptions!: Observable<Producto[]>;
  fecha:Date = new Date()
  estado:string="Pendiente";
  displayedColumns: string[] = ['codigo', 'producto', 'precio','acciones'];
  dataSource!: MatTableDataSource<any>;

  constructor(
    private router: Router,
    private fb:FormBuilder,
    private usuarioService:UsuarioService,
    private productoService:ProductoService,
    private _snackBar: MatSnackBar) { 

    this.form = this.fb.group(
      {
        fechaPrestamo:['',Validators.required],
        //nombreCliente:['',Validators.required],
        //local:['',Validators.required],
        estado:['',Validators.required],
        observacion:['',Validators.required]
      }
    );
  }

  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarProductos();
    //Filter cliente
    this.filteredOptions = this.nombreCliente.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    //Filter products
    this.filteredProductOptions = this.producto.valueChanges.pipe(
      startWith(''),
      map(value => this._filterProducts(value || '')),
    );
  }

  private _filter(value: string):Usuario[] {
    const filterValue = value.toLowerCase();

    return this.listUsuarios.filter(usuario => 
      usuario.name.toLowerCase().includes(filterValue)
      );
      
  }

  private _filterProducts(value: string):Producto[] {
    const filterProductValue = value.toLowerCase();

    return this.listProductos.filter(producto => 
      producto.name.toLowerCase().includes(filterProductValue)
      );
      
  }

  cargarUsuarios(){
    const localSession:any = null != sessionStorage.getItem('LocalInSession')? sessionStorage.getItem('LocalInSession'):"";
    this.usuarioService.getUsuarios(localSession).subscribe({
      next:response=>{
        console.log(response)
        this.listUsuarios = response;
      },error: error =>{
        this._snackBar.open('Error al cargar la lista de usuarios','',{
          duration:2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        })
      }
  });
  }

  cargarProductos(){
    const localSession:any = null != sessionStorage.getItem('LocalInSession')? sessionStorage.getItem('LocalInSession'):"";
    this.productoService.getProductos(localSession).subscribe({
      next:response=>{
        this.listProductos = response;
        this.dataSource= new MatTableDataSource(this.listProductos);
      }, error: error =>{
        this._snackBar.open('Error al cargar la lista de productos','',{
          duration:2500,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        })
      }
  });
  }

  AgregarProducto(){
    const productoPrestamo:Producto = {
      idProduct:0,
      name:this.producto.value!,
      code:this.codigo.value!,
      price:this.precio.value!,
      idLocalCreation:2
    }

    if(productoPrestamo.name != ""){
      this.listPrestamo.push(productoPrestamo);
    }
    console.log("Lista de prestamo " + JSON.stringify(this.listPrestamo));
  }

  cargarLocal(){
     
    console.log("Este es el nombre del cliente " + this.nombreCliente.value);
      this.listUsuarios.forEach(
        elemento => {
          if(this.nombreCliente.value == elemento.name){
              this.local = elemento.jobLocalName;
          }
        }
      )
    
  }

  cargarCodigoPrecio(){
    this.listProductos.forEach(
      elemento => {
        if(this.producto.value == elemento.name){
            this.codigo.setValue(elemento.code);
            this.precio.setValue(elemento.price);
        }
      }
    )
  }
  
  crearPrestamo(){

  }

  cargarTotal(){
    var sum:number =  0;
    this.listPrestamo.forEach(
      elemento => {
        const total = parseFloat(elemento.price);
        sum = sum + total;
      }
    )

    this.total.setValue(sum.toString());
  }

  cargarTabla(){
    this.cargarTotal();
    this.dataSource = new MatTableDataSource(this.listPrestamo);
    this.producto.setValue("");
    this.codigo.setValue("");
    this.precio.setValue("");
  }

  eliminarProducto(index: number){
    console.log(index);
    this.listPrestamo.splice(index,1);
    this.cargarTabla();
  }

  volver(){
    this.router.navigate(['/dashboard/prestamos']);
  }

}
