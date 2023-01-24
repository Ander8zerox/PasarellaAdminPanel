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
    public dialog: MatDialog
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
    const fecha = this.form.value.fecha;
    this.cargarPrestamos();
    this.dataSource.paginator = this.paginator;
  }

  limpiarFiltros(){
    this.form.reset();
  }

  cargarPrestamos(){
    this.listPrestamos = this.prestamoService.getPrestamo();
    this.dataSource = new MatTableDataSource(this.listPrestamos);
  }

  cargarDetallePrestamo(idPrestamo: string){
    this.listPrestamos.forEach(
      prestamo => {
        if(prestamo.idPrestamo == idPrestamo){
          this.prestamo = prestamo;
        }
      }
    );
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, idPrestamo:string): void {
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
