import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  personalInfo = {
    field1: '',
    field2: '',
    field3: '',
    field4: '',
    field5: '',
    field6: '',
    field7: ''
  };

  personalDetails!: FormGroup;

  constructor(private route: Router, private formBuilder: FormBuilder) { }

  getFormControl(control: string): AbstractControl {
    return this.personalDetails.get(control) as AbstractControl;
  }

  ngOnInit(): void {
    this.personalDetails = this.formBuilder.group({
      Firstname: new FormControl(null, [Validators.required]),
      Surname: new FormControl(null, [Validators.required]),
      ID: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Gender: new FormControl(null, [Validators.required]),
      Race: new FormControl(null, [Validators.required]),
      Disability: new FormControl(null, [Validators.required]),
    });
  }

  calculateProgress() {
    const filledFields = Object.values(this.personalDetails.value).filter(value => value !== null).length;
    return (filledFields / 7) * 100; // Assuming there are 7 fields in total
  }

  routeToEducation() {
    this.route.navigateByUrl('applicant-education');
  }

  saveAndProceed() {
    // Implement your save logic here
  }
}