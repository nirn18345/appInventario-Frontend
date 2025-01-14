import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token : string| null = '';
  try {
    token = localStorage.getItem('token');
  } catch (error) {
    console.error('Token no existe', error);
  }

  if (token) {
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
    return next(authReq);
  }
  
  return next(req);
};