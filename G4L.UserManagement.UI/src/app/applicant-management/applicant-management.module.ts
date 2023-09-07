import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MaterialModule } from '../shared/material/material.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { ApplicantAttachmentsComponent } from './applicant-attachments/applicant-attachments.component';
import { ApplicantSharedLayoutComponent } from './applicant-shared-layout/applicant-shared-layout.component';
import { ApplicantProfileDashboardComponent } from './applicant-profile-dashboard/applicant-profile-dashboard.component';
import { ApplicantSuccessComponent } from './applicant-success/applicant-success.component';
import { ApplicantionProgressComponent } from './applicantion-progress/applicantion-progress.component';
import { PersonalInformationComponent } from './personal-information/personal-information.component';
import { ApplicantEducationComponent } from './applicant-education/applicant-education.component';
import { LearnershipApplicationsComponent } from './learnership-applications/learnership-applications.component';
import { LearneshipApplicationModalComponent } from './learnership-applications/learneship-application-modal/learneship-application-modal.component';

@NgModule({
  declarations: [
 
    ApplicantAttachmentsComponent,
    ApplicantSharedLayoutComponent,
    ApplicantProfileDashboardComponent,
    ApplicantSuccessComponent,
    ApplicantionProgressComponent,
    PersonalInformationComponent,
    ApplicantEducationComponent,
    LearnershipApplicationsComponent,
    LearneshipApplicationModalComponent,
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MdbModalModule,
    PipesModule,
    MaterialModule,
    RouterModule
   
  ],
})
export class ApplicantManagementModule {}