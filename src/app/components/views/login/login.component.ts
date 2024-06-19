import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../auth/login';
import { LoginService } from '../../../auth/login.service';


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

  constructor(private router: Router, private loginService: LoginService) {
    this.loginService.removerToken();
  }

  logar() {
    this.loginService.logar(this.login).subscribe({
      next: (response: TokenResponse )=> {
        const token = response.access_token;
        if (token) { //o usuário e senha digitados estavam corretos
          this.loginService.addToken(token);
          console.log("aqui: ", token)
          this.router.navigate(['/home']);
        } else { //ou o usuário ou a senha estão incorretos
          alert('usuário ou senha incorretos!');
        }
      },
      error: erro => {
        alert('error na autenticação');
      }
    });
  }
}