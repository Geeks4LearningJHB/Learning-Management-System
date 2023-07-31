import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MaterialModule } from '../shared/material/material.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { ApplicantSidebarComponent } from './applicant-sidebar/applicant-sidebar.component';
import { journeyDashboardComponent } from './journey-to-geek/journey-dashboard';
import { RouterModule } from '@angular/router';
import { ApplicantContentAreaComponent } from './applicant-content-area/applicant-content-area.component';
import { ApplicantAttachmentsComponent } from './applicant-attachments/applicant-attachments.component';
import { ApplicantSharedLayoutComponent } from './applicant-shared-layout/applicant-shared-layout.component';



@NgModule({
  declarations: [
    ApplicantSidebarComponent,
    journeyDashboardComponent,
    ApplicantContentAreaComponent,
    ApplicantAttachmentsComponent,
    ApplicantSharedLayoutComponent,
    ApplicantSharedLayoutComponent
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