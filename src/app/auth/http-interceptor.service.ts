import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class MeuHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Inclui o token do localstorage em cada requisição HTTP (header)
    const token = localStorage.getItem('token');
    console.log(token)
    if (token && !this.router.url.includes('/login')) {
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + token },
      });
      console.log(request)
    }

    // Tratamento dos responses... podemos tratar os erros genericamente aqui
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            alert('401 - tratar aqui');
            this.router.navigate(['/login']);
          } else if (err.status === 403) {
            alert('403 - tratar aqui');
            this.router.navigate(['/login']);
          } else {
            console.error('HTTP error:', err);
          }
        } else {
          console.error('An error occurred:', err);
        }

        return throwError(err);
      })
    );
  }
}