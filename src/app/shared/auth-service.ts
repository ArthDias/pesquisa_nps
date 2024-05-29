import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthModel } from "./auth-model";

//Usado para que todos os componentes tenham acesso
@Injectable({providedIn:"root"})
export class AuthService{

    constructor(private http: HttpClient){}

    signUpUser(name: string, company: string, email: string, password: string){

        //Esse item contêm os dados de autentificação do usuário
        const authData: AuthModel = {name: name, company: company, email: email, password: password}

        this.http.post('http://localhost:3000/create-user/', authData).subscribe(res => {
            console.log(res);
        })
    }
}