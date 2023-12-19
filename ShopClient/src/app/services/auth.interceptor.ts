import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponseBase
} from '@angular/common/http';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private cache = new Map<string, any>();

  constructor(private _auth: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.headers.has('Content-Type')) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    }
    request = request.clone({ headers: request.headers.set('Authorization', 'Basic ' + this._auth.getCredentials()) });

    console.log(request.method)
    if (request.method === 'GET') {
      return next.handle(request);
    }
    return next.handle(request).pipe(
      catchError((requestError) => managedErrors(requestError)),
      tap(resp => { if (resp instanceof HttpResponseBase) { managedResponse(resp) } })
    );
  }
}
function managedErrors(requestError: any) {
  if (requestError.status !== 401) {
    const { error } = requestError;
    Swal.fire({
      icon: "error",
      title: "Oops...\n" + error.msg,
/*       text: error.msg,
      footer: '<a href="#">Why do I have this issue?</a>' */
    })
  }
  return throwError(() => new Error(requestError));
}

function managedResponse(resp: any) {
  const body = (resp['body']) ? resp['body'] : undefined;
  if (body) {
    if (body.success) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: body.msg,
        showConfirmButton: false,
        timer: 1500
      });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...\n" + body.msg,
        /*         text: body.msg,
                footer: '<a href="#">Why do I have this issue?</a>' */
      });
    }
  }


}

/* 
Formato de la cabecera
{
  headers: {
    'Authorization': 'token',
    'Content-Type': 'application/json'
  },
  withCredentials: true
} */
