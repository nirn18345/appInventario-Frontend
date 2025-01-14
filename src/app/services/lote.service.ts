import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

export interface Lote {
  loteID: number;
  numeroLote: string;
  descripcion: string;
}



@Injectable({
  providedIn: 'root'
})
export class LoteService {

  private apiUrl = 'https://localhost:7119/api/Lote';
  constructor(private http: HttpClient) { }


  getLotes(): Observable<Lote[]> {
    return this.http.get<Lote[]>(this.apiUrl);
  }
    
  
}
