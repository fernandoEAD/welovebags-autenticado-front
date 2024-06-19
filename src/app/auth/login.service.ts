// import { HttpClient } from '@angular/common/http';
// import { Injectable, inject } from '@angular/core';
// import { Observable } from 'rxjs';
// import { jwtDecode, JwtPayload } from "jwt-decode";
// import { Login } from './login';
// import { Usuario } from './usuario';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {

//   http = inject(HttpClient);
//   API = "http://localhost:8080/api/auth/token";


//   constructor() { }


//   logar(login: Login): Observable<string> {
    
//     return this.http.post<string>(this.API, login, {responseType: 'text' as 'json'});
//   }

//   addToken(token: string):void {
//     localStorage.setItem('token', token);
//   }

//   removerToken() {
//     localStorage.removeItem('token');
//   }

//   getToken() {
//     return localStorage.getItem('token');
//   }

//   jwtDecode() {
//     let token = this.getToken();
//     if (token) {
//       return jwtDecode<JwtPayload>(token);
//     }
//     return "";
//   }

//   hasPermission(role: string) {
//     let user = this.jwtDecode() as Usuario;
//     if (user.role === role)
//       return true;
//     else
//       return false;
//   }

//   getUsuarioLogado() {
//     return this.jwtDecode() as Usuario;
//   }
// }

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { Usuario } from './usuario';

interface TokenResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/auth/token";

  constructor() { }

 

  logar(login: Login): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.API, login);
  }

  addToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removerToken(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  jwtDecode(): JwtPayload | string {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return "";
  }

  hasPermission(role: string): boolean {
    let user = this.jwtDecode() as Usuario;
    if (user.role === role)
      return true;
    else
      return false;
  }

  getUsuarioLogado(): Usuario {
    return this.jwtDecode() as Usuario;
  }
}

