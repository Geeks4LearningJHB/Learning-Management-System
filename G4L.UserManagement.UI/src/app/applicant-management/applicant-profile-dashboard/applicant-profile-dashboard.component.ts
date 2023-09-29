import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicantSuccessComponent } from '../applicant-success/applicant-success.component';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { ApplicantEducationComponent } from '../applicant-education/applicant-education.component';
import { ApplicantAttachmentsComponent } from '../applicant-attachments/applicant-attachments.component';
import { ApplicantService } from '../services/applicantService';
import { UserService } from 'src/app/user-management/services/user.service';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { ServerErrorCodes } from 'src/app/shared/global/server-error-codes';


export interface Applicant {
  userId: string;

}

@Component({
  selector: 'app-applicant-profile-dashboard',
  templateUrl: './applicant-profile-dashboard.component.html',
  styleUrls: ['./applicant-profile-dashboard.component.css']
})
export class ApplicantProfileDashboardComponent implements OnInit {

  userId: any;

  serverErrorMessage: string = '';
  applicants: Applicant[] = [];

  showMessage!: boolean;
  isLocked: boolean = true;
  application: any[] = [];
  message: any;


  constructor(
    private userService: UserService,
    private applicantService: ApplicantService,
    private tokenService: TokenService,
    private modalHandler: GoalModalHandlerService<any>
  ) {}

  ngOnInit(): void {

    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.getAllApplicantions();
    this.getDocumentsByUserId(this.userId);
  }

  sendApplication(userId: string): void {
  
    this.applicantService.applyForLearnership(userId).subscribe(
      (response) => {
        this.sendEmail(userId);
        console.log(this.sendEmail)
        this.openSubmitModal();
      },
      (error) => {
        console.log(error)
      }
    );
  }

  shouldDisableButton(): boolean {
    const isUserIdPresent = this.applicants.some(applicant => applicant.userId === this.userId);
    return isUserIdPresent;
  }


  getAllApplicantions() {
    this.applicantService.getAllApplicantions().subscribe(
      (result) => {
        this.applicants = result;
        console.log(this.applicants)

      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  sendEmail(userId: string): void {

    this.applicantService.sendEmail(userId).subscribe(
      (response) => {
        console.log('Email sent successfully:', response);
      },
      (error) => {
        console.error('Error sending email:', error);
      }
    );
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

  getDocumentsByUserId(userId: number) {
    console.log(userId); // Check the value in the console
    this.applicantService.getDocumentsByUserId(userId).subscribe((response: any) => {
      console.log(response); // Check the response if it arrives
      
    });
  }
  // getDocuments(userId: string): void {
  //   this.applicantService.getDocuments(userId).subscribe(
  //     (result) => {
  //       this.applicants = result;
  //       console.log(result);
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }

  openSubmitModal(): void {
    this.modalHandler.openMdbModal<ApplicantSuccessComponent>({
      component: ApplicantSuccessComponent,
      data: null,
      ignoreBackdropClick: true,
      width: 50,
    });
  }

  openPersonalInformationModal(): void {
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


  openAttachmentsModal(): void {
    this.modalHandler.openMdbModal<ApplicantAttachmentsComponent>({
      component: ApplicantAttachmentsComponent,
      data: null,
      ignoreBackdropClick: true,
      width: 75,
      
    });
  }

}
