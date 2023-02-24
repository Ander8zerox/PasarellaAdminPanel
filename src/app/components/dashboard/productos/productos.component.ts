import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from 'src/app/interfaces/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  listProductos: Producto[]=[];
  displayedColumns: string[] = ['codigo', 'nombre', 'precio','acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productoService:ProductoService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(){
    const localSession:any = null != sessionStorage.getItem('LocalInSession')? sessionStorage.getItem('LocalInSession'):"";

    this.productoService.getProductos(localSession).subscribe({
      next:response=>{
        this.listProductos = response;
        this.dataSource= new MatTableDataSource(this.listProductos);
        console.log(this.listProductos);
      }, error: error =>{
        this.mostrarSnackBar('Error al cargar la lista de productos');
      }
  });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  eliminarProducto(index: number){
    this.mostrarSnackBar('No es posible eliminar productos en este momento');
  }

  mostrarSnackBar(message:string){
    this._snackBar.open(message,'',{
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
  }

}
