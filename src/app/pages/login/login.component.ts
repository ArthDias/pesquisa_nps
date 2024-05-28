import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isSignDivVisiable: boolean  = false;

  logInForm!: FormGroup;
  signInForm!: FormGroup;

  signUpObj: SignUpModel  = new SignUpModel();
  loginObj: LoginModel  = new LoginModel();

  constructor(private router: Router){}

  ngOnInitLogIn(){
    this.logInForm = new FormGroup({
      'email': new FormControl('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }

  ngOnInitSignIn(){
    this.signInForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required]),
      'company': new FormControl('', [Validators.required])
    })
  }

  onRegister() {
    debugger;
    const localUser = localStorage.getItem('angular17users');
    if(localUser != null) {
      const users =  JSON.parse(localUser);
      users.push(this.signUpObj);
      localStorage.setItem('angular17users', JSON.stringify(users))
    } else {
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('angular17users', JSON.stringify(users))
    }
    alert('Registration Success')
  }

  onLogin() {
    debugger;
    const localUsers =  localStorage.getItem('angular17users');
    if(localUsers != null) {
      const users =  JSON.parse(localUsers);
      //ISSO AQUI TA ERRADO
      const isUserPresent =  users.find( (user:SignUpModel)=> user.email == this.loginObj.email && user.company == this.loginObj.password);
      if(isUserPresent != undefined) {
        alert("User Found...");
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/dashboard');
      } else {
        alert("No User Found")
      }
      //^ERRADO^
    }
  }
}

export class SignUpModel  {
  name: string;
  email: string;
  company: string;

  constructor() {
    this.email = "";
    this.name = "";
    this.company= ""
  }
}

export class LoginModel  { 
  email: string;
  password: string;

  constructor() {
    this.email = ""; 
    this.password= ""
  }

}
