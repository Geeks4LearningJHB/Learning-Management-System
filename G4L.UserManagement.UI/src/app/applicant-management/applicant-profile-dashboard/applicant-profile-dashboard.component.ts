import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantSuccessComponent } from '../applicant-success/applicant-success.component';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { ApplicantEducationComponent } from '../applicant-education/applicant-education.component';
import { ApplicantAttachmentsComponent } from '../applicant-attachments/applicant-attachments.component';
import { ApplicantService, } from '../services/applicantService';
import { result } from 'lodash';
import { UserService } from 'src/app/user-management/services/user.service';
import { any } from 'ramda';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { error } from 'console';
import { ServerErrorCodes } from 'src/app/shared/global/server-error-codes';
import { response } from 'express';

@Component({
  selector: 'app-applicant-profile-dashboard',
  templateUrl: './applicant-profile-dashboard.component.html',
  styleUrls: ['./applicant-profile-dashboard.component.css'],
})
export class ApplicantProfileDashboardComponent implements OnInit {
  userId: any;
  serverErrorMessage: any;

  constructor(
    private userService: UserService,
    private applicantService: ApplicantService,
    private tokenService: TokenService,
    private modalHandler: GoalModalHandlerService<any>
  ) { }

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;

  }
  sendApplication(userId: string): void {
    this.applicantService.applyForLearnership(userId).subscribe(
      (response) => {
        this.sendEmail(userId); // Pass the userId to sendEmail
        this.openSubmitModal();
      },
      (error) => {
        alert('You have already applied for the learnership');
      }
    );
  }
  
  sendEmail(userId: string) { // Change the parameter type to string
    this.applicantService.sendEmail(userId).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
      },
      (error) => {
        console.error('Error sending email:', error);
      }
    );
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
