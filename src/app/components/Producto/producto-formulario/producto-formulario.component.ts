import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PrecioLote, ProductoService } from '../../../services/producto.service';
import { LoteService } from '../../../services/lote.service';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-producto-formulario',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './producto-formulario.component.html',
  styleUrl: './producto-formulario.component.css'
})
export class ProductoFormularioComponent {
  productForm!: FormGroup;
  isEditMode = false;
  productId!: number;

  availableLotes: any[] = []; // Lista de lotes

  constructor(
    private fb: FormBuilder,
    private productService: ProductoService,
    private loteService: LoteService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      estado: ['Activo', Validators.required],
      imagen: [''],
      productoPrecios: this.fb.array([]) // Corregir este campo para usar 'lotes'
    });
    this.cargarLotes();
    this.addLote();

    this.route.paramMap.subscribe((params) => {
      this.productId = Number(params.get('id'));
      console.log(this.productId);
      if (this.productId) {
        this.isEditMode = true;
        this.loadProduct(this.productId);
      }
    });
  }

  // Getter para el FormArray de lotes
  get productoPrecios(): FormArray {
    return this.productForm.get('productoPrecios') as FormArray;
  }

  cargarLotes(): void {
    this.loteService.getLotes().pipe(
      map((lotes: any[]) => 
        lotes.map((lote) => ({
          ...lote,
          loteID: lote.id // Cambiar 'id' a 'loteID'
        }))
      )
    ).subscribe({
      next: (data) => {
        console.log(data);
        this.availableLotes = data; // Asignar la respuesta transformada
      },
      error: (err) => {
        console.error('Error al cargar los lotes:', err);
      }
    });
  }

  // Agregar un nuevo grupo de lote y precio al FormArray
  addLote(): void {
    const loteGroup = this.fb.group({
      loteID: ['', Validators.required], // ID del lote
      precio: [0, [Validators.required, Validators.min(0)]],
      cantidad: [0, [Validators.required, Validators.min(0)]],
      fechaInicio: [null, Validators.required], // Campo obligatorio
      fechaFin: [null] // Opcional
    });
    this.productoPrecios.push(loteGroup); 
  }

  // Eliminar un lote del FormArray
  removeLote(index: number): void {
    this.productoPrecios.removeAt(index);
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe((product) => {
      console.log(product);

      // Llenar los campos básicos
      this.productForm.patchValue({
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        stock: product.stock,
        estado: product.estado,
        imagen: product.imagen
      });

      // Limpiar los lotes previos antes de agregar los nuevos
      this.productoPrecios.clear();

      // Agregar los lotes y precios al formulario
      if (product.productoPrecios && product.productoPrecios.length > 0) {
        product.productoPrecios.forEach((precioLote: PrecioLote) => {
          this.addLotePrecio(precioLote); // Llamar al método con tipo de dato explícito
        });
      }
    });
  }

  addLotePrecio(precioLote: PrecioLote): void {
    const loteGroup = this.fb.group({
      loteID: [precioLote.loteID, Validators.required], 
      precio: [precioLote.precio, Validators.required],
      cantidad: [precioLote.cantidad, Validators.required],
      fechaInicio: [precioLote.fechaInicio, Validators.required], // Campo obligatorio
      fechaFin: [precioLote.fechaFin] // Opcional
    });
    this.productoPrecios.push(loteGroup); 
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      this.toastr.error('Por favor, completa todos los campos', 'Error');
      return;
    }

    const productData = this.productForm.value;

    if (this.isEditMode) {
      console.log(productData);
      this.productService.updateProduct(this.productId, productData).subscribe(() => {
        this.toastr.success('Producto actualizado correctamente', '¡Éxito!');
        this.router.navigate(['/products']);
      });
    } else {
      console.log(productData);
      this.productService.createProduct(productData).subscribe(() => {
        this.toastr.success('Producto guardado correctamente', '¡Éxito!');
        this.router.navigate(['/products']);
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
