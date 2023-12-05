import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { User, UserCredentials } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'http://localhost:4000/auth/user/';
  private user = new BehaviorSubject<User | null>(null);
  user$  = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));


  // Constructor del servicio
  constructor(
    private _http:HttpClient
    ) { }

    login(user:UserCredentials) {
      return this._http.post<any>(this._url+"/log", user)
      .pipe(
        /* tap -> bucle??? pasa un stream de flujo de datos.
         El operador tap para realizar efectos secundarios en la secuencia sin modificar los datos. 
         En este caso, verifica si la propiedad success en la respuesta es true y, en ese caso, 
         actualiza el estado del usuario usando el método next del BehaviorSubject */
        tap( resp => { //resp = response
          if(resp.success) {
            this.user.next(resp.user);
          }
        } )
      )
    }
}


/*
Este código define un servicio de autenticación en una aplicación Angular utilizando Angular's Dependency Injection y RxJS para manejar observables. Aquí hay un análisis detallado:

Decorador @Injectable y Metadata:

@Injectable({ providedIn: 'root' }): Este decorador indica que la clase AuthService es un servicio que puede ser inyectado en cualquier parte de la aplicación y debe ser proporcionado en la raíz del módulo.
Importaciones:

BehaviorSubject, Observable, map, tap: Importaciones de RxJS, que son utilizadas para manejar flujos de datos asíncronos (observables) y realizar operaciones en ellos.
User, UserCredentials: Importaciones de modelos que representan la información del usuario y las credenciales del usuario.
HttpClient: Importación del servicio de Angular para realizar solicitudes HTTP.
Propiedades:

_url: Una cadena que representa la URL base para las operaciones de autenticación.
user: Un objeto BehaviorSubject que mantiene el estado actual del usuario. Inicializado con null.
user$: Un observable público creado a partir del BehaviorSubject user.
isLoggedIn$: Un observable público derivado de user$ utilizando el operador pipe y map(Boolean). Emite true si hay un usuario autenticado y false en caso contrario.
Constructor:

private _http: HttpClient: Inyección del servicio HttpClient que se utilizará para realizar solicitudes HTTP.
Método login:

Toma un parámetro user de tipo UserCredentials, que probablemente contenga credenciales de usuario para la autenticación.
Realiza una solicitud HTTP GET a la URL _url utilizando el método get del servicio HttpClient.
Utiliza el operador pipe para encadenar operadores en la secuencia de observables resultante de la solicitud HTTP.
Utiliza el operador tap para realizar efectos secundarios en la secuencia sin modificar los datos. En este caso, verifica si la propiedad success en la respuesta es true y, en ese caso, actualiza el estado del usuario utilizando el método next del BehaviorSubject.
En resumen, este servicio de autenticación proporciona observables que otros componentes pueden usar para conocer el estado actual de la autenticación y notifica cambios en este estado a través de BehaviorSubject. El método login realiza una solicitud HTTP y actualiza el estado del usuario si la autenticación tiene éxito.
*/