import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private cookieService: CookieService) { }

  isLogged() {
    if (this.cookieService.get('token')) {
      return true;
    } else {
      return false;
    }
  }

  getToken() {
    return this.cookieService.get('token');
  }

  // Trocar isso, deve vir do backend
  getRoles() {
    const roles = ['']; // Trocar isso, tem que vir do service. Se o service enviar user e o expectedRole é Admin, vai falhar. Osegredo esta aqui
    return roles;
  }
}
