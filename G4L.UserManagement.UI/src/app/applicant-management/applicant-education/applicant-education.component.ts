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
      // If the form is invalid, return early and do not proceed with signup
      return;
    }
    // if (this.educationForm.valid) {
    //   console.log("Form is valid. Submitting...");
  
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
           alert('Form is not valid. Please fill in all required fields correctly.');
        }
      );
    // } else {
    //   console.log("Form is not valid.");
    // }
  }
  

    //   this.applicantService.onSubmit(formData).subscribe(
    //     (response) => {
    //       console.log('Form submitted successfully. Response:', response);
    //       this.modalRef.close();
    //     },
    //     (error) => {
    //       console.error('Error submitting the form:', error);
    //       // Handle the error, such as showing an error message
    //     }
    //   );
    // } else {
    //   // Show an alert when the form is not valid
    //   alert('Form is not valid. Please fill in all required fields correctly.');


  onSaveAndCloseClick(): void {
    this.modalRef.close();
  }
}

/* VALIDATORS FOR PERSONAL PAGE

getFormControl(control: String): AbstractControl {
    return this.personalInformationForm.controls[`${control}`];
  }

  ngOnInit() {
    Initialize the form with the form controls and their validations
    this.personalInformationForm = new FormGroup({
      Firstname: new FormControl(null, [Validators.required, Validators.required]),
      Surname: new FormControl(null, Validators.required),
      idNumber: ['', [Validators.required, Validators.pattern('^[0-9]{13}$')]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      race: ['', Validators.required],
    });
  }


  
  get disabilityControl() {
    return this.myForm.get('disability');
  }

  // Enable or disable the disabilityReason text box based on the selected value
  onDisabilityChange() {
    const isDisabilityEnabled = this.disabilityControl.value === 'Yes';
    const disabilityReasonControl = this.myForm.get('disabilityReason');

    if (isDisabilityEnabled) {
      disabilityReasonControl.enable();
    } else {
      disabilityReasonControl.disable();
    }
  }
}
  */
