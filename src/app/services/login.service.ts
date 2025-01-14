import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:7119/api/Credenciales/login';
  constructor(private http: HttpClient) {}


  login(usuario: string, clave: string): Observable<any> {
    return this.http
      .post<{ token: string }>(this.apiUrl, { usuario, clave })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
        }),
        catchError((error) => {
          console.error('Error en el login:', error);
          return throwError(() => error);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}