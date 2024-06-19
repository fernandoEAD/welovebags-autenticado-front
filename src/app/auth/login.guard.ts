import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.loginService.getToken();
    if (!token) {
      // Se não estiver autenticado, redireciona para a página de login
      this.router.navigate(['/login']);
      return false;
    }

    // Verifica permissão
    if (this.loginService.hasPermission('USER') && state.url === '/') {
      alert('Você não tem permissão de acesso à essa rota!');
      return false;
    }

    return true;
  }
}