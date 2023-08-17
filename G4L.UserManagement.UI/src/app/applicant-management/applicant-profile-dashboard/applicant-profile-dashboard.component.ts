import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantSuccessComponent } from '../applicant-success/applicant-success.component';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
@Component({
  selector: 'app-applicant-profile-dashboard',
  templateUrl: './applicant-profile-dashboard.component.html',
  styleUrls: ['./applicant-profile-dashboard.component.css']
})
export class ApplicantProfileDashboardComponent implements OnInit {

  constructor(private modalHandler: GoalModalHandlerService<any>) { }

  ngOnInit(): void {
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
