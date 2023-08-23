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

@Component({
  selector: 'app-applicant-education',
  templateUrl: './applicant-education.component.html',
  styleUrls: ['./applicant-education.component.css'],
})
export class ApplicantEducationComponent implements OnInit {
  educationForm!: FormGroup;

  keys = Object.keys;

  serverErrorMessage: any;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private applicantService: ApplicantService,
    public modalRef: MdbModalRef<any>
  ) {}

  getFormControl(control: String): AbstractControl {
    return this.educationForm.controls[`${control}`];
  }

  ngOnInit(): void {
    this.educationForm = new FormGroup({
      MathSubject: new FormControl('', [Validators.required]),
      MathMark: new FormControl('', [Validators.required]),
      EnglishMark: new FormControl('', [Validators.required]),
      Qualifications: new FormControl('', [Validators.required]),
      FieldOfStudy: new FormControl('', [Validators.required]),
      CourseOfInterest: new FormControl('', [Validators.required]),
    });
  }

  serverErrorHandling(error: any) {
    if (error && error.errorCode === ServerErrorCodes.DuplicateEmail) {
      this.educationForm.controls['Email'].setErrors({
        duplicateEmailError: true,
      });
      this.serverErrorMessage = error.message;
    }
    this.educationForm.updateValueAndValidity();
  }

  clearServerError() {
    this.serverErrorMessage = ''; 
  } 
  onSubmit(): void {
    if (this.educationForm.invalid) {
      alert('Form is not valid. Please fill in all required fields correctly.');
      // If the form is invalid, return early and do not proceed with education information
      return;
    }
  

      this.applicantService.onSubmit(this.educationForm.value).subscribe(
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
    this.modalRef.close();
  }
}
