import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  userForm: FormGroup;

  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router) {
    this.userForm = this._fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/)]],
      username: ['', [Validators.required, Validators.max(16)]],
      role: ['', [Validators.required]]
    })
  }
  validateInput(param: string): boolean {
    let obj = this.userForm.get(param);
    return obj !== null && obj.invalid && obj?.touched;
  }

  createUser(password: any) {
    if (password === this.userForm.get('password')?.value) {
      this._auth.signUp(this.userForm.value as User).subscribe();
      this._router.navigate(['']);
    } else {
      Swal.fire({
        icon: "error",
        title: "La contraseña no coincide",
        text: "Intentelo de nuevo"
      });
    }
  }

}
