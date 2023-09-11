import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { CustomValidators } from '../../../shared/validators/custom-validators';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { SignupModalComponent } from 'src/app/user-management/signup-modal/signup-modal.component';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { isNil } from 'lodash';
import { validateIdNumber } from 'src/app/shared/global/helper';
import { ServerErrorCodes } from 'src/app/shared/global/server-error-codes';
import { UserService } from 'src/app/user-management/services/user.service';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { personalInformation } from '../services/applicantService';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  personalInformationData: personalInformation[] = [];

  personalDetails!: FormGroup;

  userId: any;
  keys = Object.keys;
  serverErrorMessage: any;

  constructor(private route: Router, private formBuilder: FormBuilder, private userService: UserService, private tokenService: TokenService, public modalRef: MdbModalRef<any>) { }

  getFormControl(control: String): AbstractControl {
    return this.personalDetails.controls[`${control}`];
  }


  ngOnInit(): void {
    let user = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.buildForm();

  }

  buildForm() {
    this.personalDetails = this.formBuilder.group({
      userId: [this.userId],
      Firstname: ['', [Validators.required, CustomValidators.names]],
      Surname: ['', [Validators.required, CustomValidators.names]],
      IdNumber: ['', [Validators.required, Validators.pattern('^[0-9]{13}$'), CustomValidators.IdNumber]],
      Email: ['', [Validators.email, CustomValidators.email]],
      Gender: ['', [Validators.required]],
      Race: ['', Validators.required],
      Phone: ['', [Validators.required, CustomValidators.phone]],
    })
  }

  // serverErrorHandling(error: any) {
  //   if (error && error.errorCode === ServerErrorCodes.DuplicateEmail) {
  //     this.personalDetails.controls['Email'].setErrors({
  //       duplicateEmailError: true,
  //     });
  //     this.serverErrorMessage = error.message;
  //   }
  //   this.personalDetails.updateValueAndValidity();
  // }

  clearServerError() {
    this.serverErrorMessage = '';
  }

  onPersonalDetailsSubmit(): void {
    if (this.personalDetails.valid) {
      console.log(this.personalDetails.value)
      this.userService.onPersonalDetailsSubmit(this.personalDetails.value).subscribe(
        (response: any) => {
          console.log("POST request successful:", response);
          if (!this.serverErrorMessage) {
            this.modalRef.close();
          }
        },
        (error: any) => {
          console.log(error)
          // this.serverErrorHandling(error);
          alert('Form is not valid. Please fill in all required fields correctly.');
          return;
        }
      );
    }
  }

  onSaveAndCloseClick(): void {
    console.log(this.personalDetails)
    this.modalRef.close();
   
  }

  saveInformation() {
    console.log(this.personalDetails)
  }

  // getAllUsers() {
  //   this.userService.getPersonalById().subscribe((response: any) => {

  //   });
  // }

}



