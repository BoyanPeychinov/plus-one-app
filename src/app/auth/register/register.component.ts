import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerFormGroup: FormGroup = this.formBuilder.group({
    "username": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    "password": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private location: Location) { }

  ngOnInit(): void {
  }

  handleRegister() {
    const {username, password} = this.registerFormGroup.value;

    const body: IUser = {
      username: username,
      password: password
    }

    this.authService.register$(body).subscribe(() => {
      this.router.navigate(['/events'])
    })
  }

  handleGoBack(): void {
    this.registerFormGroup.reset;
    this.location.back()
  }

}
