import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto, ProductoService } from '../../../services/producto.service';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; 
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { ProductoDetalleComponent } from '../producto-detalle/producto-detalle.component';

@Component({
  selector: 'app-producto-lista',
  standalone: true,
  imports: [
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './producto-lista.component.html',
  styleUrl: './producto-lista.component.css'
})
export class ProductoListaComponent implements OnInit {
  productos: Producto []=[];
  selectedLote: { [productoId: number]: any } = {};
  displayedColumns:string[]=['imagen','nombre','precio','descripcion','stock','estado','lote'];
  searchTerm:string='';
  totalCount=0;
  
  
  currentPage = 1;
  pageSize = 5;
  
  constructor(
    private productService: ProductoService, private dialog: MatDialog, private router: Router,
   private toastr: ToastrService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }
  
  
  fetchProducts(): void {
    this.productService
      .ObtenerProductos(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (response) => {
         
          this.productos = response.items; // Asigna los productos
          this.totalCount = response.totalRegistros; // Total de registros para la paginación
  
          this.productos.forEach((producto) => {
            // Inicializa el lote seleccionado si hay precios disponibles
            if (producto.productoPrecios && producto.productoPrecios.length > 0) {
              this.selectedLote[producto.id] = producto.productoPrecios[0];
              
            }
          });
        },
        error: (error) => {
          console.error('Error al cargar los productos:', error);
        },
      });
  }

  onLoteChange(producto: any, event: any): void {
    const selectedPrecio = event.value;
    producto.precioActual = selectedPrecio.precio;
    producto.stock=selectedPrecio.cantidad;
    console.log(
      `Lote cambiado para el producto ${producto.nombre}: ${selectedPrecio.numeroLote} - $${selectedPrecio.precio}`
    );
  }

  onSearch(): void {
    this.currentPage = 1;
    this.fetchProducts();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.fetchProducts();
  }

  editProduct(product: any): void {
    if (product?.id) {
      this.router.navigate(['/products/edit', product.id]);
    } else {
      console.error('Error: El producto no tiene ID');
    }
  }

  deleteProduct(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar Producto',
        message: '¿Estás seguro de que quieres eliminar este producto?',
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Llamamos al servicio para eliminar el producto
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            // Muestra el mensaje de éxito
            this.toastr.success('Producto eliminado', '¡Eliminado!');
            
            // Actualiza la lista de productos localmente
            this.productos = this.productos.filter(productos => productos.id !== id);
          },
          error: () => {
            this.toastr.error('Error al eliminar el producto', 'Error');
          },
        });
      }
    });
  }

  viewDetails(product: any,precio: number): void {
    product.precio=precio;
    this.dialog.open(ProductoDetalleComponent, {
      data: product,
      width: '750px',
    });
  }

}
