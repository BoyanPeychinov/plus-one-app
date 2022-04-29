import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { IProfile } from 'src/app/core/interfaces/profile';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userId: string;

  registerFormGroup: FormGroup = this.formBuilder.group({
    "username": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    "password": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  });

  profileFormGroup: FormGroup = this.formBuilder.group({
    "name": new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    "height": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    "weight": new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(3)]),
    "position": new FormControl(null),
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private profileService: ProfileService) { }

  ngOnInit(): void {
  }

  handleRegister() {
    const { username, password } = this.registerFormGroup.value;

    const { name, height, weight, position } = this.profileFormGroup.value;

    const regBody: IUser = {
      username: username,
      password: password
    }

    const profileBody: IProfile = {
      name,
      height,
      weight,
      position,
    }
    
    this.profileService.postProfile$(profileBody).subscribe(profileData => {
      regBody.profile = profileData.objectId;
      this.authService.register$(regBody).subscribe(userData => {
        profileBody.userId = userData.objectId;
        this.profileService.editProfile$(profileBody, profileData.objectId).subscribe(() => {
          this.router.navigate(['/auth/login'])
        })
      })
    })

    
  }
  handleGoBack(): void {
    this.registerFormGroup.reset;
    this.location.back()
  }

}
