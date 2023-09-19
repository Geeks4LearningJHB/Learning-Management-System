import { Component, EventEmitter, OnInit } from '@angular/core';
import { ApplicantSuccessComponent } from '../applicant-success/applicant-success.component';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { ApplicantEducationComponent } from '../applicant-education/applicant-education.component';
import { ApplicantAttachmentsComponent } from '../applicant-attachments/applicant-attachments.component';
import { ApplicantService } from '../services/applicantService';

import { UserService } from 'src/app/user-management/services/user.service';

import { TokenService } from 'src/app/user-management/login/services/token.service';
import { ServerErrorCodes } from 'src/app/shared/global/server-error-codes';

@Component({
  selector: 'app-applicant-profile-dashboard',
  templateUrl: './applicant-profile-dashboard.component.html',
  styleUrls: ['./applicant-profile-dashboard.component.css'],
})
export class ApplicantProfileDashboardComponent implements OnInit {
  userId: any;
  serverErrorMessage: string = '';
  duplicateIdNumberError!: boolean;


  constructor(
    private userService: UserService,
    private applicantService: ApplicantService,
    private tokenService: TokenService,
    private modalHandler: GoalModalHandlerService<any>
  ) {}

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;
  }
  sendApplication(userId: string): void {
    this.applicantService.applyForLearnership(this.userId).subscribe(
      (response) => {
        this.openSubmitModal();
      },
      (error) => {
        if (error && error.errorCode === ServerErrorCodes.DuplicateIdNumber) {
          this.duplicateIdNumberError = true;
          this.serverErrorMessage= error.messag;
        } else {
          this.duplicateIdNumberError= false;
          this.serverErrorMessage = error.messag;
        }
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
    this.applicantService
      .getEducationByUserId(userId)
      .subscribe((response: any) => {
        console.log(response); // Check the response if it arrives
        this.openEducationModal();
      });

    this.applicantService
      .getEducationByUserId(userId)
      .subscribe((response: any) => {
        this.openEducationModal();
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
