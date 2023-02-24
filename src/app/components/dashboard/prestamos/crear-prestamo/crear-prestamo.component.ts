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
import { Prestamo } from 'src/app/interfaces/prestamo';
import { DatePipe } from '@angular/common';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-crear-prestamo',
  templateUrl: './crear-prestamo.component.html',
  styleUrls: ['./crear-prestamo.component.css']
})
export class CrearPrestamoComponent implements OnInit {
  
  form:FormGroup;
  nombreCliente = new FormControl('');
  producto =  new FormControl('');
  codigo = new FormControl('');
  precio = new FormControl('');
  total = new FormControl('');
  observacion =  new FormControl('');
  jobLocal = new FormControl('');
  estado = new FormControl('Pendiente'); 
  
  listUsuarios: Usuario[]=[];
  listProductos: Producto[]=[];
  listPrestamo:Producto[]=[];
  idCliente:number = 0;
  idProducto:number = 0;
  localSession:any = null != sessionStorage.getItem('LocalInSession')? sessionStorage.getItem('LocalInSession'):"";

  displayedColumns: string[] = ['codigo', 'producto', 'precio','acciones'];
  titulo:string = "Crear Prestamo"; 

  filteredOptions!: Observable<Usuario[]>;
  filteredProductOptions!: Observable<Producto[]>;
  fecha:Date = new Date()
  dataSource!: MatTableDataSource<any>;

  constructor(
    private router: Router,
    private fb:FormBuilder,
    private usuarioService:UsuarioService,
    private productoService:ProductoService,
    private prestamoService:PrestamoService,
    private _snackBar: MatSnackBar) { 

    this.form = this.fb.group(
      {
        //fechaPrestamo:['',Validators.required],
        //nombreCliente:['',Validators.required],
        //local:['',Validators.required],
        //estado:['',Validators.required],
        observacion:['']
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
    this.usuarioService.getUsuarios(this.localSession).subscribe({
      next:response=>{
        this.listUsuarios = response;
      },error: error =>{
        this.mostrarSnackBar('Error al cargar la lista de usuarios');
      }
  });
  }

  cargarProductos(){
      this.productoService.getProductos(this.localSession).subscribe({
        next:response=>{
          this.listProductos = response;
        }, error: error =>{
          this.mostrarSnackBar('Error al cargar la lista de productos');
        }
    });
  }

  AgregarProducto(){
    const productoPrestamo:Producto = {
      idProduct:this.idProducto,
      name:this.producto.value!,
      code:this.codigo.value!,
      price:this.precio.value!,
      idLocalCreation:this.localSession
    }

    if(productoPrestamo.name != ""){
      this.listPrestamo.push(productoPrestamo);
    }
    else{
      this.mostrarSnackBar("Debe seleccionar un producto para agregar")
    }
  }

  cargarLocal(){
     
      this.listUsuarios.forEach(
        elemento => {
          if(this.nombreCliente.value == elemento.name){
              this.jobLocal.setValue(elemento.jobLocalName);
              this.idCliente = elemento.idCustomer;
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
            this.idProducto = elemento.idProduct;
        }
      }
    )
  }
  
  crearPrestamo(){

    if(this.nombreCliente.value == ""){
      this.mostrarSnackBar("Debe seleccionar un cliente");
    }else
    if(this.listPrestamo.length <= 0){
      this.mostrarSnackBar("Debe agregar al menos un producto");
    }else
    {
      var datePipe = new DatePipe('es-ES');
      var fechaCreacion = datePipe.transform(this.fecha,'EEEE, MMMM d, y');
      const prestamoCrear:Prestamo = {
          idLending:0,
          dateLending:fechaCreacion!.toString(),
          customerName:this.nombreCliente.value!,
          idCustomer:this.idCliente,
          jobLocal:this.jobLocal.value!,
          status:this.estado.value!,
          totalAmount:Number(this.total.value!),
          products:this.listPrestamo,
          observation:this.form.value.observacion,
          idLocalCreation:this.localSession
      }

      this.prestamoService.agregarPrestamo(prestamoCrear).subscribe(
        {
          next:response => {
              this.mostrarSnackBar("Prestamo creado con exito!");
              this.limpiarCampos();
          }, error: error => {
              this.mostrarSnackBar("Ocurrio un error al crear el prestamo");
              console.log(error)
          } 
        }
      );
    }
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
    this.listPrestamo.splice(index,1);
    this.cargarTabla();
  }

  volver(){
    this.router.navigate(['/dashboard/prestamos']);
  }

  limpiarCampos(){
    this.form.reset();
    this.nombreCliente.reset();
    this.total.reset();
    this.jobLocal.reset();
    this.listPrestamo = [];
    this.dataSource = new MatTableDataSource(this.listPrestamo);

  }

  mostrarSnackBar(message:string){
    this._snackBar.open(message,'',{
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
  }

}
