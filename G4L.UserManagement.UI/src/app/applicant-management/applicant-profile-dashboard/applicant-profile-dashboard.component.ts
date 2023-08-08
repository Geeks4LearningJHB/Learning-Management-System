import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { ApplicantEducationComponent } from '../applicant-education/applicant-education.component';
@Component({
  selector: 'app-applicant-profile-dashboard',
  templateUrl: './applicant-profile-dashboard.component.html',
  styleUrls: ['./applicant-profile-dashboard.component.css']
})
export class ApplicantProfileDashboardComponent implements OnInit {

  constructor(private router:Router, private modalHandler: GoalModalHandlerService<any> ) { }

  ngOnInit(): void {
  }


onSubmitApplication(){
  this.router.navigateByUrl('applicant-success')
}
openPerosonalInformationModal(): void {
  this.modalHandler.openMdbModal<PersonalInformationComponent>({
    component: PersonalInformationComponent,
    data: null,
    ignoreBackdropClick: true,
    width: 50,
  });
}

openEducationModal(): void {
  this.modalHandler.openMdbModal<ApplicantEducationComponent>({
    component: ApplicantEducationComponent,
    data: null,
    ignoreBackdropClick: true,
    width: 50,
  });
}

routeToEducation(){
  this.router.navigateByUrl('applicant-education')
}
routeToAttachments(){
  this.router.navigateByUrl('applicant-attachments')
}


}


