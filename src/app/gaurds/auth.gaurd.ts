import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(
    private auth: AuthService,
    private router: Router,
    private navController: NavController
  ){}

  canLoad():Observable<boolean>{
    return of(false)
  }
}
