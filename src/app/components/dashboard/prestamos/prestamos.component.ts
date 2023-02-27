import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Prestamo } from 'src/app/interfaces/prestamo';
import { PrestamoService } from 'src/app/services/prestamo.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetallePrestamoComponent } from './detalle-prestamo/detalle-prestamo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { TitleStrategy } from '@angular/router';


@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

  form:FormGroup;
  listPrestamos:Prestamo[]=[];
  estadoSelect: any[] = ['Pendiente','Cancelado','Cerrado'];
  estado = new FormControl('');
  prestamo!:Prestamo;
  inhabilitarBusqueda:Boolean = true;
  criterioUltimaBusqueda:string = "";
  localSession:any = null != sessionStorage.getItem('LocalInSession')? sessionStorage.getItem('LocalInSession'):"";

  displayedColumns: string[] = ['select','fechaPrestamo', 'nombreCliente', 
  'estado','observacion','local','detalle'];
  dataSource!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
   /* if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    //this.selection.select(...this.dataSource.data); select all rows
    //this.dataSource.connect().value.forEach(row => this.selection.select(row)); select just  rows in the view
    */
   return;
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  constructor(
    private fb:FormBuilder,
    private prestamoService:PrestamoService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
    ) {
    
    this.form = this.fb.group(
      {
        fecha:['']
      }
    );
   }

  ngOnInit(): void {
  }

  buscarPrestamos(){

    if(null != this.form.value.fecha && this.form.value.fecha != ""){
      console.log(this.form.value.fecha);
      this.buscarPorFecha();
    }else if(null != this.estado.value && this.estado.value != ""){
      this.buscarPorEstado();
    }else{
      this.mostrarSnackBar("Debe seleccionar una fecha o un estado para cargar la busqueda");
    }
    
  }

  buscarPorFecha(){
    const fecha = this.form.value.fecha;
    this.criterioUltimaBusqueda="fecha";
    var datePipe = new DatePipe('es-ES');
    var fechaCreacion = datePipe.transform(fecha,'EEEE, MMMM d, y');
    
    this.prestamoService.getPrestamosFechaYLocalCreacion(fechaCreacion!.toString(),this.localSession).subscribe(
      {
        next:response=>{
          this.listPrestamos = response;
          if(this.listPrestamos.length === 0){
            this.mostrarSnackBar('No se encontraron prestamos para la fecha seleccionada');
          }else{
            this.dataSource = new MatTableDataSource(this.listPrestamos);
            this.dataSource.paginator = this.paginator;
          }
        }, error: error =>{
          this.mostrarSnackBar('Error al cargar la lista de prestamos');
        }
      }
    );
  }

  buscarPorEstado(){
    const estado = this.estado.value;
    this.criterioUltimaBusqueda="estado";
    this.prestamoService.getPrestamosEstadoYLocalCreacion(estado!.toString(),this.localSession).subscribe(
      {
        next:response=>{
          this.listPrestamos = response;
          if(this.listPrestamos.length === 0){
            this.mostrarSnackBar('No se encontraron prestamos para el estado seleccionado');
          }else{
            this.dataSource = new MatTableDataSource(this.listPrestamos);
            this.dataSource.paginator = this.paginator;
          }
        }, error: error =>{
          this.mostrarSnackBar('Error al cargar la lista de prestamos');
        }
      }
    );
  }

  limpiarFiltros(){
    this.form.reset();
    //this.estado.reset();
  }

  cargarDetallePrestamo(idPrestamo: number){
    this.listPrestamos.forEach(
      prestamo => {
        if(prestamo.idLending == idPrestamo){
          this.prestamo = prestamo;
        }
      }
    );
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, idPrestamo:number): void {
    this.cargarDetallePrestamo(idPrestamo);
    const dialogRef = this.dialog.open(DetallePrestamoComponent, {
      width: '460px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:this.prestamo
    });

    dialogRef.afterClosed().subscribe(result => {
      if(this.criterioUltimaBusqueda == "fecha") {
        this.buscarPorFecha();
      } else {
        this.buscarPorEstado();
      }
      }
    )
  }

  mostrarSnackBar(message:string){
    this._snackBar.open(message,'',{
      duration:3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
  }

}
