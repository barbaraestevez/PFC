import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(private _auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.headers.has('Content-Type')){
      request = request.clone({headers:request.headers.set('Content-Type','aplication/json')});
    }
  

    request = request.clone({headers: request.headers.append('Authorization','Basic '+this._auth.getCredentials())})
    return next.handle(request);
  }
}

/*
FORMATO DE LA CABECERA
{
  headers: {
    'Authorization': `Basic ${credentials}`,
    'Content-Type': 'application/json'
  },
  withCredentials:true
}
*/