import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { CustomValidators } from '../../../shared/validators/custom-validators';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { SignupModalComponent } from 'src/app/user-management/signup-modal/signup-modal.component';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { isNil } from 'lodash';
import { validateIdNumber } from 'src/app/shared/global/helper';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  personalDetails!: FormGroup;

  constructor(private route: Router, private formBuilder: FormBuilder, public modalRef: MdbModalRef<any>) { }

  getFormControl(control: String): AbstractControl {
    return this.personalDetails.controls[`${control}`];
  }

  ngOnInit(): void {
    this.personalDetails = new FormGroup({
      Firstname: new FormControl(null, [Validators.required, CustomValidators.names]),
      Surname: new FormControl(null, [Validators.required, CustomValidators.names]),
      IdNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{13}$'), CustomValidators.IdNumber]),
      Email: new FormControl(null, [Validators.required, Validators.email, CustomValidators.email]),
      Gender: new FormControl(null, [Validators.required]),
      Race: new FormControl(null, Validators.required),
      Phone: new FormControl(null, [Validators.required, CustomValidators.phone]),

    });
  }

  isFormValid(): void {
    if (this.personalDetails.valid) {
      console.log('Form submitted. Data:', this.personalDetails.value);
      this.modalRef.close();
    } else {
      // Show an alert when the form is not valid
      alert('Form is not valid. Please fill in all required fields correctly.');
    }

  }

  onSaveAndCloseClick(): void {
    this.modalRef.close();
  }

  saveInformation() {
    //  e.preventDefault();
    console.log(this.personalDetails)

    // if (!this.personalDetails.valid) {
    //   return;
    // }

    // alert("Heyy;lo")
  }


}



