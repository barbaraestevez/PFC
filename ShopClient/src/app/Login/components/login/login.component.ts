import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCredentials } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userForm: FormGroup;

  constructor( 
    private _formBuild: FormBuilder, 
    private _auth: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
    ) {
    this.userForm = this._formBuild.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/)]]
    })
  }

  login() {
    this._auth.login(this.userForm.value as UserCredentials)
    .subscribe((resp) => {
    //.subscribe(resp => {
    if (!resp.success) {
      alert("Error al iniciar sesión: " + resp.msg);
    } else {
      this._router.navigate(['shop', 'home'], { relativeTo: this._activatedRoute });
    }
  }, error => {
    console.error("Error en la solicitud de inicio de sesión:", error);
    alert("Error en la solicitud de inicio de sesión. Consulta la consola para más detalles.");
  });
  }

  validateParams(paramName: string, mode = true) {
    return (mode) 
      ?
      this.userForm.get(paramName)?.hasError('required') && this.userForm.get(paramName)?.touched 
      :
      this.userForm.get(paramName)?.hasError('pattern') && this.userForm.get(paramName)?.dirty;

  }
}
