// applicant-profile-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ApplicantService} from '../services/applicantService';
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


export interface Education{
  userId: string;
  mathSubject: string;
  mathMark:string;
  englishMark:string;
  fieldOfStudy:string;
  qualifications:string;
  courseOfInterest:string;
}

@Component({
  selector: 'app-applicant-education',
  templateUrl: './applicant-education.component.html',
  styleUrls: ['./applicant-education.component.css'],
})
export class ApplicantEducationComponent implements OnInit {
  
  educations : Education= {
    userId: '',
    mathSubject: '',
    mathMark:'',
    englishMark:'',
    fieldOfStudy:'',
    qualifications:'',
    courseOfInterest:'',
  }

  educationForm!: FormGroup;
  
  keys = Object.keys;

  userId : any
  serverErrorMessage: any;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private applicantService: ApplicantService,
    public modalRef: MdbModalRef<any>,
    private tokenService: TokenService
  ) { }

  getFormControl(control: String): AbstractControl {
    return this.educationForm.controls[`${control}`];
  }

  ngOnInit(): void {
    let user = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.buildForm();
    this.applicantService.getEducationByUserId(this.userId).subscribe((result) =>{
      this.educations  = result;
      console.log(this.educations)
    })
    }

    buildForm() {
      this.educationForm = this.formBuilder.group({
        userId: [this.userId],
        MathSubject: ['', [Validators.required]],
        MathMark: ['', [Validators.required]],
        EnglishMark: ['', [Validators.required]],
        Qualifications: ['', [Validators.required]],
        FieldOfStudy: ['', [Validators.required]],
        CourseOfInterest: ['', Validators.required],
      })

    this.applicantService.getEducationByUserId(this.userId).subscribe(
      (result) => {
        
        this.educations = result;
        console.log(this.educations)
        this.educationForm.get('MathMark')?.setValue(this.educations.mathMark);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  clearServerError() {
    this.serverErrorMessage = '';
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


  onSubmit(): void {
    if (this.educationForm.invalid) {
      alert('Form is not valid. Please fill in all required fields correctly.');
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
