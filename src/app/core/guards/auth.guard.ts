import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Route,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isLogged()) {
      return true;
    }
    this.router.navigate(['/signin']);
    return false;
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    if (this.authService.isLogged()) {
      return true;
    }
    this.router.navigate(['/signin']);
    return false;
  }
}
