import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  token = '';
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Aqui vc faz todo processo que vai interceptar a requisicao. O interceptor precisa ser declarado nos providers do app.module
    this.token = this.authService.getToken();
    if(this.token) {
      const tokenizedReq = request.clone({
        headers: request.headers.set('Authorization', 'Bearer '+ this.token)
      });
      return next.handle(tokenizedReq);
    }
    return next.handle(request);
  }
}
