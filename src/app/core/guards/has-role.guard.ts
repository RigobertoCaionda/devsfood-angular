import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    return this.isAuthorized(route);
  }
  
  private isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const roles = ['Admin', 'User']; // Trocar isso, tem que vir do service. Se o service enviar user e o expectedRole é Admin, vai falhar. Osegredo esta aqui
    const expectedRoles = route.data['expectedRoles']; // Aqui tem uma lista de array que passamos na rota
    const roleMatches = roles.findIndex(role => expectedRoles.indexOf(role) !== - 1 ); // Pega nas roles que vem do service e verifica se existe nas rotas esperadas
    return roleMatches < 0 ? false : true;
  }
}
