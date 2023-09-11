import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantSuccessComponent } from '../applicant-success/applicant-success.component';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { ApplicantEducationComponent } from '../applicant-education/applicant-education.component';
import { ApplicantAttachmentsComponent } from '../applicant-attachments/applicant-attachments.component';
import { ApplicantService,  } from '../services/applicantService';
import { result } from 'lodash';
@Component({
  selector: 'app-applicant-profile-dashboard',
  templateUrl: './applicant-profile-dashboard.component.html',
  styleUrls: ['./applicant-profile-dashboard.component.css']
})
export class ApplicantProfileDashboardComponent implements OnInit {

  userId: any;
  
  constructor(private modalHandler: GoalModalHandlerService<any>,
    private applicantService: ApplicantService) { }

  ngOnInit(): void {
  }
  
  openPersonalInformationModal(): void {
    this.modalHandler.openMdbModal<PersonalInformationComponent>({
      component: PersonalInformationComponent,
      data: null,
      ignoreBackdropClick: true,
      width: 50,
    });
  }
  
  getEducationByUserId(userId: number) {
    console.log(userId); // Check the value in the console
this.applicantService.getEducationByUserId(userId).subscribe((response: any) => {
  console.log(response); // Check the response if it arrives
  this.openEducationModal();
});

    this.applicantService.getEducationByUserId(userId).subscribe((response: any) => {
      // this.filterUserByRole(response);
      console.log(userId)
      this.openEducationModal()
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

  openAttachmentsModal(): void {
    this.modalHandler.openMdbModal<ApplicantAttachmentsComponent>({
      component: ApplicantAttachmentsComponent,
      data: null,
      ignoreBackdropClick: true,
      width: 75,
    });
  }

  openSubmitModal(): void {
    this.modalHandler.openMdbModal<ApplicantSuccessComponent>({
      component: ApplicantSuccessComponent,
      data: null,
      ignoreBackdropClick: true,
      width: 50,
    });
  }
}
