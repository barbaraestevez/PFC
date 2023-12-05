import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userForm: FormGroup;

  constructor(private _formBuild: FormBuilder) {
    this.userForm = this._formBuild.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/)]]
    })
  }

  login() {
    console.log(this.userForm);
  }

  validateParams(paramName: string, mode = true) {
    return (mode) 
      ?
      this.userForm.get(paramName)?.hasError('required') && this.userForm.get(paramName)?.touched 
      :
      this.userForm.get(paramName)?.hasError('pattern') && this.userForm.get(paramName)?.dirty;

  }
}
