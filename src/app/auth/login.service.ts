
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Login } from './login';
import { Usuario } from './usuario';
import { MatSnackBar } from '@angular/material/snack-bar';

interface TokenResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  http = inject(HttpClient);
  API = "http://localhost:8080/api/auth/token";

  constructor(private _snack: MatSnackBar) { }

 

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

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  mensagem(str: String): void {
    this._snack.open(`${str}`, 'OK', {
      horizontalPosition: 'end', 
      verticalPosition: 'top',
      duration: 3000
    })
  }
}

