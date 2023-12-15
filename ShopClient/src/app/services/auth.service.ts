import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { User, UserCredentials } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'http://localhost:4000/auth/user/';
  private user = new BehaviorSubject<User | null>(null);
  user$  = this.user.asObservable();
  private _credentials: string = "";
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));


  // Constructor del servicio
  constructor(
    private _http:HttpClient
    ) { }

    login(user:UserCredentials) {
      return this._http.post<any>(this._url+"/log", user).pipe(
        /* tap -> bucle??? pasa un stream de flujo de datos.
         El operador tap para realizar efectos secundarios en la secuencia sin modificar los datos. 
         En este caso, verifica si la propiedad success en la respuesta es true y, en ese caso, 
         actualiza el estado del usuario usando el método next del BehaviorSubject */
        tap( resp => { //resp = response
          if(resp.success) {
            this._credentials = btoa(resp.user.email+':'+resp.user.password);
            this.user.next(resp.user);
          }
        })
      )
    }

    
    getCredentials() {
      return this._credentials;
    }
  }
  // signUp(user:User) {
  //   return this._http.post(this._url,user);
  // }