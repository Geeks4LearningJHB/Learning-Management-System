import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantService } from '../services/applicantService';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ServerErrorCodes } from 'src/app/shared/global/server-error-codes';
import { TokenService } from 'src/app/user-management/login/services/token.service';

@Component({
  selector: 'app-applicant-education',
  templateUrl: './applicant-education.component.html',
  styleUrls: ['./applicant-education.component.css'],
})
export class ApplicantEducationComponent implements OnInit {
  educationForm!: FormGroup;
  userId :any;
  keys = Object.keys;

  serverErrorMessage: any;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private applicantService: ApplicantService,
    private tokenService: TokenService,
    public modalRef: MdbModalRef<any>
  ) {}

  getFormControl(control: String): AbstractControl {
    return this.educationForm.controls[`${control}`];
  }
  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.buildForm();
  }
  buildForm() {
    this.educationForm = this.formBuilder.group({
      userId: [this.userId],
      MathSubject: ['', [Validators.required]],
      MathMark: ['', [Validators.required]],
      EnglishMark: ['', [Validators.required]],
      Qualifications: ['', [Validators.required]],
      FieldOfStudy: ['', [Validators.required]],
      CourseOfInterest: ['', [Validators.required]],
    });
  }
  

  clearServerError() {
    this.serverErrorMessage = ''; 
  }

  serverErrorHandling(error: any) {
    if (error && error.errorCode === ServerErrorCodes.DuplicateIdNumber) {
      this.educationForm.controls['userId'].setErrors({
        DuplicateIdNumber: true,
      });
      this.serverErrorMessage = error.message;
    }
    this.educationForm.updateValueAndValidity();
  }
  onSubmit(): void {
    if (this.educationForm.invalid) {
      alert('Form is not valid. Please fill in all required fields correctly.');
      // If the form is invalid, return early and do not proceed with education information
      return;
    }
    const formData = {
      userId: this.userId,
      ...this.educationForm.value
    };

      this.applicantService.onSubmit(formData).subscribe(
        (response) => {
          console.log("POST request successful:", response);
          if (!this.serverErrorMessage) {
            this.modalRef.close();
          }
        },
        (error) => {
          console.log("POST request error:", error);
          this.serverErrorHandling(error);
          alert('Form has already been submitted');
        }
      );
 
  }
  
  onSaveAndCloseClick(): void {
    this.modalRef.close();
  }
}
