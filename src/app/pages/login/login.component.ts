import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/auth-service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignDivVisiable: boolean  = false;

  loginForm!: FormGroup;
  signUpForm!: FormGroup;

  constructor(private authService: AuthService){}

  ngOnInit(): void{
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
    this.signUpForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'company': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  onForget() {
    
  }

  onSignUp() {
    this.authService.signUpUser(this.signUpForm.value.name, this.signUpForm.value.company, this.signUpForm.value.email, this.signUpForm.value.password);
  }

  onLogin() {
   
  }
}