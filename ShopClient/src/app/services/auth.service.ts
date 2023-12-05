import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url = 'http://localhost:4000/auth/user/';
  private user = new BehaviorSubject<User | null>(null);
  user$  = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));


  constructor(
    /* private _http: */
    ) { }

}
