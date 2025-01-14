import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';


export interface  productoPrecios{
  loteID:number;
  numeroLote:string;
  descripçion:string;
  precio:string;
  fechaInicio:string;
  fechaFin:string;

}
export interface PrecioLote {
  loteID: number;
  precio: number;
  cantidad: number;
  fechaInicio: string;
  fechaFin: string;
}

export interface Producto {
  id: number;
  nombre: string;
  precio: string;
  descripcion: string;
  estado: string;
  stock: string;
  imagen: string;
  fechaCreacion: string;
  productoPrecios:[object];
}

export interface PaginacionResponse {
  items: Producto[];
  totalRegistros: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = 'https://localhost:7119/api/Producto'

  constructor(private http: HttpClient) { }

  ObtenerProductos(
    pagina: number,
    cantidad: number,
    buscar: string = ''

  ): Observable<PaginacionResponse> {
    let params = new HttpParams()
      .set('page', pagina)
      .set('size', cantidad)
    if(buscar){
      params=params.set('search',buscar);
    }
    return this.http.get<PaginacionResponse>(this.url, { params }).pipe(
      catchError((error) => {
        console.error('Error al obtener productos:', error);
        throw error;
      })
    );

    
  }

  createProduct(product: any): Observable<any> {
    return this.http.post<any>(this.url, product);
  }


  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, product);
  }


  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }
}
