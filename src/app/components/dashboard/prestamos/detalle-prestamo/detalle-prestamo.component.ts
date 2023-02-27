import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Prestamo } from 'src/app/interfaces/prestamo';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PrestamoService } from 'src/app/services/prestamo.service';
import { Producto } from 'src/app/interfaces/producto';

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
  descuento = new FormControl('');
  valorSinDescuento = new FormControl('');
  observacion = new FormControl('');
  initialObservation!:string;
  form:FormGroup;
  guardarDeshabilitado:Boolean=false;

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
    this.initialObservation = this.data.observation;
    this.observacion.setValue(this.data.observation);
    this.dataSource = new MatTableDataSource(this.data.products);
    this.mostrarSnackBar("Recuerde dejar una observación siempre que realice una modificación");
    this.cargarValores();
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

          console.log(prestamo);
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
        const internalProduct:Producto = this.data.products.at(index)!;
        this.data.products.splice(index,1);
        this.cargarTotal(internalProduct.price);
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
      duration:4000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    })
  }

  cargarTotal(restaValue:string){
   
     //descontamos del valor total el precio del producto eliminado
     var resta = Number(this.totalAmount.value) - Number(restaValue);
     if(resta < 0){
        this.guardarDeshabilitado=true; // se usara para cuando queramos evitar valores negativos en el valor a pagar
        this.mostrarSnackBar("Verifíque el valor total ya que el descuento es mayor al valor a pagar");
     }
     this.totalAmount.setValue(resta.toString());
     this.cargarValores();
   
  }

  cargarValores(){
    var sum:number =  0;
    this.data.products.forEach(
      elemento => {
        const total = parseFloat(elemento.price);
        sum = sum + total;
      }
    )
    //se suman los precios de los productos  en la lista para conocer el valor sin descuento
    this.valorSinDescuento.setValue(sum.toString());
    // restamos al valor sin descuento el valor con descuento para conocer el descuento otorgado
    this.descuento.setValue((Number(this.valorSinDescuento.value) - Number(this.totalAmount.value)).toString());
  }

}
