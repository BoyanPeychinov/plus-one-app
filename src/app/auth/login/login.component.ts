import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup = this.formBuilder.group({
    "username": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    "password": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  handleLogin() {
    const {username, password} = this.loginFormGroup.value;

    const body: IUser = {
      username,
      password
    }

    this.authService.login$(body).pipe(
      tap(currentUser => console.log(currentUser))
    ).subscribe(() => {
      this.router.navigate(['/events'])
    });
  }

  handleGoBack(): void {
    this.loginFormGroup.reset;
    this.location.back()
  }

}
