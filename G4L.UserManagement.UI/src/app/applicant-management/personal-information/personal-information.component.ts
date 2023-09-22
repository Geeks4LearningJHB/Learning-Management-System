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
// import { personalInformation } from '../services/applicantService';
import { ApplicantService } from '../services/applicantService';
import { ToastrService } from 'ngx-toastr';


export interface PersonalInformation {
  userId: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  idNumber: string;
  race: string;
  gender: string;
  disability: string;
}

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  personalInformations : PersonalInformation= {
    userId: '',
    name: '',
    surname:'',
    email:'',
    phone:'',
    idNumber: '',
    race:'',
    gender:'',
    disability:'',
  }
  personalDetails!: FormGroup;
  
  userId: any;
  keys = Object.keys;
  serverErrorMessage: any;



  constructor(private route: Router, private toastr: ToastrService,private applicantService: ApplicantService ,private formBuilder: FormBuilder, private userService: UserService, private tokenService: TokenService, public modalRef: MdbModalRef<any>) { }

  getFormControl(control: String): AbstractControl {
    return this.personalDetails.controls[`${control}`];
  }


  ngOnInit(): void {
    let user = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.buildForm();
    this.applicantService.onPersonalDetailsSubmit(this.userId).subscribe((result) =>{
      this.personalInformations  = result;
      console.log(this.personalInformations)

      
    })
  }

  buildForm() {
    this.personalDetails = this.formBuilder.group({
      userId: [this.userId],
      Name: ['', [ CustomValidators.names]],//'Validators.required,' removed as it throws an exception even if field is filled
      Surname: ['', [ CustomValidators.names]],//'Validators.required,' same reason above
      IdNumber: ['', [Validators.required, Validators.pattern('^[0-9]{13}$'), CustomValidators.IdNumber]],
      Email: ['', [Validators.email, CustomValidators.email]],
      Disability: [''],
      Gender: ['', [Validators.required]],
      Race: ['', Validators.required],
      Phone: ['', [Validators.required, CustomValidators.phone]],
    })
  }

  clearServerError() {
    this.serverErrorMessage = '';
  }

  onPersonalDetailsSubmit(): void {
    if (this.personalDetails.valid) {
      console.log(this.personalDetails.value)
      console.log(Response)
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

  onPersonalDetailsUpdate(): void {
    this.applicantService.onPersonalDetailsUpdate(this.personalDetails.value).subscribe(
      (response: any) => {
        console.log("PUT request successful:", response);
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
  
  serverErrorHandling(error: any) {
    if (error && error.errorCode === ServerErrorCodes.DuplicateEmail) {
      this.personalDetails.controls['Email'].setErrors({
        duplicateEmailError: true,
      });
      this.serverErrorMessage = error.message;
    }
    this.personalDetails.updateValueAndValidity();
  }
  onDoneClick(): void {
    if (this.personalDetails.invalid) {
      alert('Form is not valid. Please fill in all required fields correctly.');
      return;
    }

    this.applicantService.onSubmit(this.personalDetails.value).subscribe(
      (response) => {
        console.log("POST request successful:", response);
        if (!this.serverErrorMessage) {
          this.modalRef.close();
        }
      },
      (error) => {
        console.log("POST request error:", error);
        this.serverErrorHandling(error);

      }
    );
  }

  onSaveAndCloseClick(): void {
    this.applicantService.onSaveAndClose(this.personalDetails.value).subscribe(
      (response) => {
        console.log("PUT request successful:", response);
        console.log(this.personalDetails)
        this.modalRef.close();})
      }

  saveInformation() {
    console.log(this.personalDetails)
  }

}