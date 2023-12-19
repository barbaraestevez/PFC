// Importa módulos y clases de Angular y otras dependencias
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { User, UserCredentials } from '../models/user';
import { HttpClient } from '@angular/common/http';

// Decorador Injectable indica que este servicio puede ser inyectado en otros componentes o servicios
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL de la API para la autenticación de usuarios
  private _url = 'http://localhost:4000/auth/user';
  // BehaviorSubject que almacena el estado del usuario actualmente autenticado
  // Inicializado con un valor nulo, ya que no hay usuario autenticado al principio
  private user = new BehaviorSubject<User | null>(null);
  // Observable expuesto para que los componentes puedan suscribirse y recibir actualizaciones del estado del usuario
  user$ = this.user.asObservable();
  private _credentials: string = '';

  // Observable que emite un valor booleano indicando si hay un usuario autenticado (true) o no (false)
  // Utiliza el operador map para convertir el valor del BehaviorSubject en un valor booleano (true si hay un usuario, false si no)
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  // Constructor del servicio
  constructor(
    private _http: HttpClient
  ) { }

  login(user: UserCredentials) {
    return this._http.post<any>(this._url + "/log", user).pipe(
      tap(resp => {
        if (resp.success) {
          // Recuperamos las credenciales y los codificamos a base64
          this._credentials = btoa(resp.user.email + ':' + resp.user.password);
          this.user.next(resp.user);
        }
      })
    )
  }

  signUp(user: User) {
    return this._http.post(this._url, user);
  }

  getCredentials() {
    return this._credentials;
  }
}


// En resumen, este servicio Angular (AuthService) gestiona la autenticación de usuarios.
//  Utiliza un BehaviorSubject para almacenar y proporcionar el estado del usuario
//  actualmente autenticado. Además, expone dos observables: user$, 
// que emite actualizaciones del estado del usuario, y isLoggedIn$, 
// que emite un valor booleano indicando si hay un usuario autenticado.

