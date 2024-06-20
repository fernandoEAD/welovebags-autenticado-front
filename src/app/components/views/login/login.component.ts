import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../auth/login';
import { LoginService } from '../../../auth/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';


interface TokenResponse {
  access_token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  login: Login = new Login();

  constructor(private router: Router, private loginService: LoginService, private snackBar: MatSnackBar) {
    this.loginService.removerToken();
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: (response: TokenResponse) => {
        const token = response.access_token;
        if (token) {
          this.loginService.addToken(token);
          console.log("aqui: ", token);
          this.router.navigate(['/home']);
          this.loginService.mensagem('Login bem-sucedido!');
        } else {
          this.loginService.mensagem('Usuário ou senha incorretos!');
        }
      },
      error: erro => {
        if (erro.error && erro.error.errors) {
          for (let i = 0; i < erro.error.errors.length; i++) {
            this.loginService.mensagem(erro.error.errors[i].message);
          }
        } else {
          this.loginService.mensagem('Credenciais inválidas!');
        }
      }
    });
  }
}