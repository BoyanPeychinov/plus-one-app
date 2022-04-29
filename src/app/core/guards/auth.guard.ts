import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(): boolean {
    // this.authService.isLoggedIn$.pipe
    // (take(1), map(isLoggedIn => this.isLoggedIn = isLoggedIn))
    // console.log("Logged", this.isLoggedIn);
    this.authService.isLoggedIn$.subscribe(logged => {
      this.isLoggedIn = logged
    })

    console.log("Logged", this.isLoggedIn);

    if (!this.isLoggedIn) {
      console.log(this.authService.isLoggedIn$);
      this.router.navigate(['auth/login']);
      return false;
    }
    return true;
  }
  
}
