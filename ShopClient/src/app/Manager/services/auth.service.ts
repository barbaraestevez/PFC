import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'http://localhost:4000/api/user/';
  private user = new BehaviorSubject<User | null>(null); //este User es privado y es el contenedor
  user$ = this.user.asObservable(); //este user$ será público y lo usaremos para acceder
  isLoggedIn$:Observable<boolean> = this.user$.pipe(map(Boolean)); // versión simplificada del observable de user$ si no es null. Si existe algo que no es null, devuelve true, si no, devuelve false

  constructor() { }

}