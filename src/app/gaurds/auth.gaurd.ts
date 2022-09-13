import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router,
    private navController: NavController
  ) { 
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.auth) {
      // user installing add first time then move to register page other it move login page
      const appInstall = localStorage.getItem('app_install') || '';
      if (appInstall !== '') {
        return this.navController.navigateRoot(['/login']);
      } else {
        return this.navController.navigateRoot(['/register']);
      }
    }
    return true;
  }
}
