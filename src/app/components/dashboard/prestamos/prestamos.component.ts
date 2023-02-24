import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Prestamo } from 'src/app/interfaces/prestamo';
import { PrestamoService } from 'src/app/services/prestamo.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DetallePrestamoComponent } from './detalle-prestamo/detalle-prestamo.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-prestamos',
  templateUrl: './prestamos.component.html',
  styleUrls: ['./prestamos.component.css']
})
export class PrestamosComponent implements OnInit {

  form:FormGroup;
  listPrestamos:Prestamo[]=[];
  estado: any[] = ['Asignado','Pendiente','Cancelado','Terminado'];
  prestamo!:Prestamo;

  displayedColumns: string[] = ['select','fechaPrestamo', 'nombreCliente', 
  'local','detalle' ,'estado','observacion'];
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
        fecha:['',Validators.required],
        recolector:['']
      }
    );
   }

  ngOnInit(): void {
  }

  buscarPrestamos(){
    const localSession:any = null != sessionStorage.getItem('LocalInSession')? sessionStorage.getItem('LocalInSession'):"";
    const fecha = this.form.value.fecha;
    this.prestamoService.getPrestamosFechaYLocalCreacion("19 feb 2023, 7:36:24",localSession).subscribe(
      {
        next:response=>{
          this.listPrestamos = response;
          this.dataSource = new MatTableDataSource(this.listPrestamos);
          this.dataSource.paginator = this.paginator;
          console.log("esto fue lo que me lleve : " + fecha);
          console.log("esto fue lo que encontre : " + response);
        }, error: error =>{
          this._snackBar.open('Error al cargar la lista de prestamos','',{
            duration:2500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          })
        }
      }
    );
  }

  limpiarFiltros(){
    this.form.reset();
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
      width: '480px',
      height: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data:this.prestamo
    });
  }

}
