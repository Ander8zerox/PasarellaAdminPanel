import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Prestamo } from 'src/app/interfaces/prestamo';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-detalle-prestamo',
  templateUrl: './detalle-prestamo.component.html',
  styleUrls: ['./detalle-prestamo.component.css']
})
export class DetallePrestamoComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'precio', 'acciones'];
  dataSource!: MatTableDataSource<any>;
  estadoSelect: any[] = ['Pendiente','Cancelado','Cerrado'];
  estado = new FormControl('');
  totalAmount = new FormControl('');
  observacion = new FormControl('');
  form:FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DetallePrestamoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Prestamo,
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private prestamoService:PrestamoService,) { 
      
      this.form = this.fb.group(
        {
        }
      );
    }

  ngOnInit(): void {
    this.estado.setValue(this.data.status);
    this.totalAmount.setValue(this.data.totalAmount.toString());
    this.observacion.setValue(this.data.observation);
    this.dataSource = new MatTableDataSource(this.data.products);
  }

  editarPrestamo(){
    const prestamo:Prestamo = {
      idLending:this.data.idLending,
      dateLending:this.data.dateLending,
      customerName:this.data.customerName,
      idCustomer:this.data.idCustomer,
      jobLocal:this.data.jobLocal,
      status:this.estado.value!,
      totalAmount:Number(this.totalAmount.value!),
      products:this.data.products,
      observation:this.observacion.value!,
      idLocalCreation:this.data.idLocalCreation
    }
    this.prestamoService.updatePrestamo(prestamo.idLending,prestamo).subscribe({
      next:response => {
        console.log(prestamo)
          this.mostrarSnackBar("Prestamo editado con exito!");
      }, error: error =>{
        console.log(JSON.stringify(error));
        this.mostrarSnackBar("Ocurrio un error al editar el prestamo");
      }
  });
  }

  eliminarProducto(index: number){
      if(this.data.products.length > 1){
        this.data.products.splice(index,1);
        this.dataSource = new MatTableDataSource(this.data.products);
      }else{
        this.mostrarSnackBar("Debe cambiar el estado a 'Cerrado' en lugar de eliminar todos los productos");
      }
  }

  cerrar(): void {
    this.dialogRef.close();
  }

  mostrarSnackBar(message:string){
    this._snackBar.open(message,'',{
      duration:3500,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    })
  }

}
