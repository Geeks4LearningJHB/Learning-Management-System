import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-applicant-education',
  templateUrl: './applicant-education.component.html',
  styleUrls: ['./applicant-education.component.css']
})
export class ApplicantEducationComponent implements OnInit {

  educationForm!: FormGroup;
  constructor(private route: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.educationForm = new FormGroup({
      Firstname: new FormControl(null, [Validators.required, Validators.required]),
      Surname: new FormControl(null, [Validators.required]),
      IdNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{13}$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', [Validators.required]),
      race: new FormControl('', [Validators.required])
    })



  }
  routeToPersonalInformation(){
    this.route.navigateByUrl('personal-details')
  }
  routeToAttachments() {
    this.route.navigateByUrl('applicant-attachments')

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