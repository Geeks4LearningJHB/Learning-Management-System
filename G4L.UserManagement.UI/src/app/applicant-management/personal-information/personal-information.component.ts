import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { CustomValidators } from '../../../shared/validators/custom-validators';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { SignupModalComponent } from 'src/app/user-management/signup-modal/signup-modal.component';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
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
      Firstname: new FormControl(null, [Validators.required]),
      Surname: new FormControl(null, Validators.required),
      ID: new FormControl(null, [Validators.required]),
      Email: new FormControl(null, [Validators.required, Validators.email]),
      Gender: new FormControl(null, [Validators.required]),
      Race: new FormControl(null, Validators.required),
      Disability: new FormControl('No', [Validators.required]),
    });

  }



  routeToEducation() {
    this.route.navigateByUrl('applicant-education')

  }

  routeToApplicantDashboard() {
    this.route.navigateByUrl('applicant-profile-dashboard');
  }

  onDoneClick(): void {
    this.modalRef.close();
  }
  onSaveAndCloseClick(): void {
    this.modalRef.close();
  }

  saveInformation(){
    //  e.preventDefault();

    if(!this.personalDetails.valid){
      return;
    }

    alert("Heyy;lo")
  }
}




// function closeModal() {
//   throw new Error('Function not implemented.');
// }
   // routeToProfile() {
  //   this.route.navigate(["learnership-application", "Profile"])


