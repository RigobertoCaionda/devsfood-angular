import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private apiService: ApiService
  ) {}

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

  doLogin(token: string, keepLogged = false) {
    if(keepLogged) {
      this.cookieService.set('token', token, { expires: 5, path: '/' }); // O path indica a pagina/rota a que o cookie pertence. Por padrão o cookie pertence a rota atual, temos 2 rotas principais neste projeto, o / e o /admin. Como estamos fazendo redirect para o login quando o user tenta acessar o admin sem permissão, isso quer dizer que naquele momento o admin é a rota principal e não o /signin e para que todas as paginas possam ver o cookie é necessário que ele esteja com o path /, para que todas as rotas consigam ver.
    } else {
      this.cookieService.set('token', token, { path: '/' }); 
    }
  }

  doLogout() {
    this.cookieService.delete('token');
    window.location.href = '/home';
  }

  signIn(user: any): Observable<any> {
    return this.apiService.post('/auth/signin', user);
  }
  signUp(user: User): Observable<any> {
    return this.apiService.post('/user', user);
  }

  getRoles() {
    if(!this.getToken()) {
      return [''];
    }
    let role = JSON.parse(atob(this.getToken().split('.')[1]));
    return [role.role];
  }
}
