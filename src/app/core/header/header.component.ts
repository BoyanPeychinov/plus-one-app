import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMainState } from 'src/app/+store';
import { IUser } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser$: Observable<IUser> = this.store.select(mainState => mainState.currentUser);
  isLoggedIn$: Observable<boolean> = this.authService.isLoggedIn$;

  constructor(private authService: AuthService,
     private store: Store<IMainState>,
     private router: Router) { }

  ngOnInit(): void {
  }

  handleLogout(): void {
    this.authService.logout$().subscribe({
      complete: () => {
        localStorage.clear();
        this.router.navigate(['/events'])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
