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
  buttonClicked = false;
  done: boolean = false;

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
    console.log(this.done);
    let user = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.done = false;
    // this.done = !this.hasFormValues(this.educations);
    this.buildForm();
    this.applicantService.getEducationByUserId(this.userId).subscribe((result) =>{
      this.educations  = result;
      console.log(this.educations)
      
    })
    }

    buildForm() {
      this.educationForm = this.formBuilder.group({
        userId: [this.userId],
        MathSubject: [this.educations.mathSubject || '', [Validators.required]],
        MathMark: [this.educations.mathMark || '', [Validators.required]],
        EnglishMark: [this.educations.englishMark || '', [Validators.required]],
        Qualifications: [this.educations.qualifications || '', [Validators.required]],
        FieldOfStudy: [this.educations.fieldOfStudy || '', [Validators.required]],
        CourseOfInterest: [this.educations.courseOfInterest || '', Validators.required],
      })

    this.applicantService.getEducationByUserId(this.userId).subscribe(
      (result) => {
        
        this.educations = result;
        this.educationForm.get('MathSubject')?.setValue(this.educations.mathSubject);
        this.educationForm.get('MathMark')?.setValue(this.educations.mathMark);
        this.educationForm.get('EnglishMark')?.setValue(this.educations.englishMark);
        this.educationForm.get('Qualifications')?.setValue(this.educations.qualifications);
        this.educationForm.get('CourseOfInterest')?.setValue(this.educations.courseOfInterest);

      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  clearServerError() {
    this.serverErrorMessage = '';
  }

   enableSubmitButton(): Validators {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const formGroup = control as FormGroup;
      const isFormValid = formGroup.valid;
  
      return isFormValid ? null : { 'invalidForm': true };
    };
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
        

  private hasFormValues(formValue: any): boolean {
    for (const key in formValue) {
      if (formValue[key] !== null && formValue[key] !== '') {
        return true;
      }
    }
    return false;
  }

  onEducationBtnClick(): void {
    console.log(this.done);
    
    if (!this.hasFormValues(this.educationForm.value)) {
      alert('Please fill in the education form before submitting.');
      
      return;
    }

    
    // if (this.buttonClicked) {
    //   alert('Button has already been clicked.');
    //   return;
    // }

  
    // this.buttonClicked = true;

    this.applicantService.onSubmit(this.educationForm.value).subscribe(
      (response: any) => {
        console.log("POST request successful:", response);
        if (!this.serverErrorMessage) {
          //this.modalRef.close();
          this.done =  true;
        }
      },
      (error) => {
        console.log(error);
        alert('Once filled, use Update and Close button for making changes');
        this.buttonClicked = true;  // Reset the button status on error
      }
    );
  }
  

  onUpdate(): void {
    // Form has data, indicating an update
    this.applicantService.onEducationUpdate(this.educationForm.value).subscribe(
      (response: any) => {
        console.log("PUT request successful:", response);
        if (!this.serverErrorMessage) {
          this.modalRef.close();
          
        }
      },
      (error: any) => {
        console.log(error);
        // this.serverErrorHandling(error);
        alert('Cannot update education form information if it was initially empty.');
      }
    );
}

  onSaveAndCloseClick(): void {
    this.modalRef.close();
  }
}