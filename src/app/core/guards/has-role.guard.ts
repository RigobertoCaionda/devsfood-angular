import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private authService: AuthService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    return this.isAuthorized(route);
  }
  
  private isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const roles = this.authService.getRoles();
    const expectedRoles = route.data['expectedRoles']; // Aqui tem uma lista de array que passamos na rota
    const roleMatches = roles.findIndex(role => expectedRoles.indexOf(role) !== - 1 ); // Pega nas roles que vem do service e verifica se existe nas rotas esperadas
    return roleMatches < 0 ? false : true;
  }
}
