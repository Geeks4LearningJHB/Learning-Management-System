// applicant-profile-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { ApplicantSuccessComponent } from '../applicant-success/applicant-success.component';

@Component({
  selector: 'app-applicant-profile-dashboard',
  templateUrl: './applicant-profile-dashboard.component.html',
  styleUrls: ['./applicant-profile-dashboard.component.css']
})
export class ApplicantProfileDashboardComponent implements OnInit {

  constructor(private router: Router, private modalHandler: GoalModalHandlerService<any>) { }

  ngOnInit(): void {
  }

  onSubmitApplication() {
    this.router.navigateByUrl('applicant-success');
  }

  routeToPersonalDetails() {
    this.router.navigateByUrl('personal-details');
  }

  routeToEducation() {
    this.router.navigateByUrl('applicant-education');
  }

  routeToAttachments() {
    this.router.navigateByUrl('applicant-attachments');
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
