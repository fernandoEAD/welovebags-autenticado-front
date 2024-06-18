import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../../auth/login';
import { LoginService } from '../../../auth/login.service';

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
      next: token => {
        if (token) { //o usuário e senha digitados estavam corretos
          this.loginService.addToken(token);
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