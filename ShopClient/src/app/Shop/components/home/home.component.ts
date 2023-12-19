import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  username?: string;

  constructor(private _auth: AuthService) {
    this._auth.user$.subscribe((user) => this.username = user?.username);
  }

}
