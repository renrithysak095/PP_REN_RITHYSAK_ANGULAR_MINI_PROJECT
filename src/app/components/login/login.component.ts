import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { IAuth } from 'src/app/interface/auth';
import { AuthService } from 'src/app/service/auth.service';
import { PasswordValidationDirective } from 'src/app/validation/password-validation.directive';
import { ValidationDirective } from 'src/app/validation/validation.directive';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  reactiveForm!: FormGroup;
  authData!: IAuth;
  
  constructor(private toastr: ToastrService,private fb: FormBuilder, private _authService: AuthService, private router: Router){
    this.reactiveForm = this.fb.group(
      {
        email: new FormControl(null, [ValidationDirective.validate('^[a-zA-Z_]*\\d{3}@[^@\\s]+$') ,Validators.required]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(8),
          PasswordValidationDirective.validate
        ]),
    });
  }

  login(){

    this._authService.getAuth().subscribe({
      next: (user) => {
          localStorage.setItem('isAuthorized', 'staticToken')
          this.toastr.success('Successfully');
          this.router.navigate(['/'])
        
      }
    })
  }

  showPassword: boolean = false;

toggleShowPassword() {
  this.showPassword = !this.showPassword;
}

onEmailInput() {
  this.reactiveForm.get('email')?.markAsDirty();
}
onPasswordInput(){
  this.reactiveForm.get('password')?.markAsDirty();
}

}
