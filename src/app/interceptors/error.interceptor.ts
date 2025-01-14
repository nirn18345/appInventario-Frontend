import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 500) {
        toastr.error(
          'Ocurrió un error inesperado. Inténtalo más tarde.',
          'Error del servidor'
        );
      } else if (error.status === 0) {
        toastr.error(
          'No se puede conectar con el servidor. Verifica tu conexión.',
          'Error de red'
        );
      } else {
        toastr.error(error.error?.message || 'Error desconocido');
      }

      return throwError(() => error);
    })
  );
};