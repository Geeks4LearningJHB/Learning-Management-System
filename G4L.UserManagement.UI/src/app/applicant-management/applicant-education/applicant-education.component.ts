import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-applicant-education',
  templateUrl: './applicant-education.component.html',
  styleUrls: ['./applicant-education.component.css']
})
export class ApplicantEducationComponent implements OnInit {

  educationForm!: FormGroup;
  constructor(private route: Router, private formBuilder: FormBuilder, 
              public modalRef: MdbModalRef<any>) { }

              getFormControl(control: String): AbstractControl {
                return this.educationForm.controls[`${control}`];
              }


  ngOnInit(): void {
    this.educationForm = new FormGroup({
      MathSubject: new FormControl('',[Validators.required]),
      MathMark: new FormControl('',[Validators.required]),
      EnglishMark: new FormControl('',[Validators.required]),
      Qualifications: new FormControl('',[Validators.required]),
      FieldOfStudy: new FormControl('', [Validators.required]),
      CourseOfInterest: new FormControl('',[Validators.required]),
    })
  }


  isFormValid(): void {
    if (this.educationForm.valid) {
      console.log('Form submitted. Data:', this.educationForm.value);
      this.modalRef.close();
    } else {
      // Show an alert when the form is not valid
      alert('Form is not valid. Please fill in all required fields correctly.');
    }

  }

  onSaveAndCloseClick():void{
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