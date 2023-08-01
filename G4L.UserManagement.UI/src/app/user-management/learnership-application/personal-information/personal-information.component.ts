import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  personalDetails!: FormGroup;
  constructor(private route: Router, private formBuilder: FormBuilder) { }

  getFormControl(control: String): AbstractControl {
    return this.personalDetails.controls[`${control}`];
  }

  ngOnInit(): void {
    this.personalDetails = new FormGroup({
      Firstname: new FormControl(null, [Validators.required, Validators.required]),
      Surname: new FormControl(null, Validators.required),
      ID: new FormControl(null, [Validators.required, Validators.required]),
      Email: new FormControl(null, Validators.email),
      Gender: new FormControl(null, [Validators.required, Validators.required]),
      Race: new FormControl(null, Validators.required),
      Disability: new FormControl(null, [Validators.required, Validators.required]),
    });
  }

  routeToEducation() {
    this.route.navigate(["learnership-application", "education"])

  }

   // routeToProfile() {
  //   this.route.navigate(["learnership-application", "Profile"])

}
