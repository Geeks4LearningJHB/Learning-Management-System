// applicant-profile-dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantService } from '../services/applicantService'; 
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TokenService } from 'src/app/user-management/login/services/token.service';

@Component({
  selector: 'app-applicant-education',
  templateUrl: './applicant-education.component.html',
  styleUrls: ['./applicant-education.component.css'],
})
export class ApplicantEducationComponent implements OnInit {
  educationForm!: FormGroup;
  userId: any;
  serverErrorMessage: any;
  educationData: any; 
  
  
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private applicantService: ApplicantService,
    public modalRef: MdbModalRef<any>,
    private tokenService: TokenService
  ) {}

  getFormControl(control: String): AbstractControl {
    return this.educationForm.controls[`${control}`];
  }

  // showSuccessMessage(messageTitle: string, message: string, duration: number = this.defaultDuration): void {
  //   this.toastrService.success(message, messageTitle, { timeOut: duration });
  // }
  
  ngOnInit(): void {
    let user = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.buildForm();

    if (this.userId) {
      this.applicantService.getEducationByUserId(this.userId).subscribe(
        (data) => {
          this.educationData = data;

          if (this.educationData) {
            this.populateForm(this.educationData);
          }
        },
        (error) => {
          console.error('Error fetching education data:', error);
        }
      );
    } else {
      console.error('User is not authenticated.');
    }
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
    });
  }

  populateForm(data: any): void {
    // Populates the form controls with data
    this.educationForm.patchValue({
      MathSubject: data.mathSubject,
      MathMark: data.mathMark,
      EnglishMark: data.englishMark,
      Qualifications: data.qualifications,
      FieldOfStudy: data.fieldOfStudy,
      CourseOfInterest: data.courseOfInterest,
    });
  }

  onSubmit(): void {
    if (this.educationForm.invalid) {
      alert('Form is not valid. Please fill in all required fields correctly.');
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
      }
    );
  }

  serverErrorHandling(error: any) {
    // Implement your server error handling logic here.
    console.log("Server error:", error);
    // You can display an error message to the user or perform other actions as needed.
  }

  submitFormUsingHttpGet(): void {
    this.applicantService.submitFormUsingHttpGet(this.educationForm.value).subscribe(
      (response) => {
        console.log("GET request successful:", response);
        this.modalRef.close();
      },
      (error) => {
        console.log("GET request error:", error);
        // Handle the GET request error if needed.
      }
    );
    this.modalRef.close();
  }
}
