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

  doLogin(token: string) {
    this.cookieService.set('token', token, { expires: 5 });
  }

  doLogout() {
    this.cookieService.delete('token');
    window.location.href = '';
  }

  signIn(user: any): Observable<any> {
    return this.apiService.post('/auth/signin', user);
  }
  signUp(user: User): Observable<any> {
    return this.apiService.post('/user', user);
  }

  getRoles() {
    let role = JSON.parse(atob(this.getToken().split('.')[1]));
    return [role.role];
  }
}
