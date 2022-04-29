import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { IMainState } from 'src/app/+store';
import { IProfile } from 'src/app/core/interfaces/profile';
import { IUser } from 'src/app/core/interfaces/user';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<IUser> = this.store.select(mainState => mainState.currentUser)
  profileId: string;
  currentProfile: IProfile;
  isInEditMode: boolean = false;


  profileFormGroup: FormGroup = this.formBuilder.group({
    "name": new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    "height": new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(3)]),
    "weight": new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(3)]),
    "position": new FormControl(null),
  });

  constructor(private formBuilder: FormBuilder,
    private location: Location,
    private store: Store<IMainState>,
    private profileService: ProfileService,
    private router: Router) { }

  ngOnInit(): void {
    this.currentUser$.subscribe(user => {
      this.profileId = user.profile
    })
    
    this.profileService.getProfile$(this.profileId)
      .subscribe(profile => this.currentProfile = profile);
  }

  enterEditMode(): void {
    this.isInEditMode = true;

    setTimeout(() => {
      this.profileFormGroup.patchValue({
        name: this.currentProfile.name,
        height: this.currentProfile.height,
        weight: this.currentProfile.weight,
        position: this.currentProfile.position,
      })
    })
  }


  handleEdit(): void {
    const { name, height, weight, position } = this.profileFormGroup.value;

    const body: IProfile = {
      name,
      height,
      weight,
      position,
    }

    this.profileService.editProfile$(body, this.currentProfile.objectId)
    .subscribe(() => {
      this.profileService.getProfile$(this.profileId).subscribe((newProfile => {
        this.currentProfile = newProfile
        setTimeout(() => {
          this.router.navigate(['auth/profile'])
        }, 3000)
      }))
    })

    this.isInEditMode = false;

  }

  handleGoBack(): void {
    this.profileFormGroup.reset;
    if (!this.isInEditMode) {
      this.location.back();
    }
    this.isInEditMode = false;
  }

}
