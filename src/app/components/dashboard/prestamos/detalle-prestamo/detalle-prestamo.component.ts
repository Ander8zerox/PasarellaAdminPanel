import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Prestamo } from 'src/app/interfaces/prestamo';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-detalle-prestamo',
  templateUrl: './detalle-prestamo.component.html',
  styleUrls: ['./detalle-prestamo.component.css']
})
export class DetallePrestamoComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'precio'];
  dataSource!: MatTableDataSource<any>;
  estadoSelect: any[] = ['Pendiente','Cancelado','Cerrado'];
  estado = new FormControl('');

  constructor(public dialogRef: MatDialogRef<DetallePrestamoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prestamo) { }

  ngOnInit(): void {
    this.estado.setValue(this.data.estado);
    this.dataSource = new MatTableDataSource(this.data.detalle);
  }

  /*cargarProductos(){
    this.dataSource= new MatTableDataSource(this.data.detalle);
  }*/

  cerrar(): void {
    this.dialogRef.close();
  }

}
