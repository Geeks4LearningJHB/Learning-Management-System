import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicantSharedLayoutComponent } from '../applicant-shared-layout/applicant-shared-layout.component';
import { journeyDashboardComponent } from '../journey-to-geek/journey-dashboard';
import { ApplicantAttachmentsComponent } from '../applicant-attachments/applicant-attachments.component';
import { ApplicantProfileDashboardComponent } from '../applicant-profile-dashboard/applicant-profile-dashboard.component';
import { ApplicantSuccessComponent } from '../applicant-success/applicant-success.component';
import { PersonalInformationComponent } from '../personal-information/personal-information.component';
import { ApplicantEducationComponent } from '../applicant-education/applicant-education.component';
import { ApplicationProgressComponent } from '../application-progress/application-progress.component';

const routes: Routes = [ {
  path: '',
  component: ApplicantSharedLayoutComponent,
  children: [
    { path: '', redirectTo: 'journey-to-geek', pathMatch: 'full' },
     {path: 'journey-to-geek', component: journeyDashboardComponent },
     {path: 'applicant-attachments', component:ApplicantAttachmentsComponent},
    {path: 'applicant-profile-dashboard', component:ApplicantProfileDashboardComponent},
    {path: 'applicant-success', component:ApplicantSuccessComponent},
    {path: 'application-progress', component:ApplicationProgressComponent},
    {path: 'personal-details', component: PersonalInformationComponent},
    {path: 'applicant-education', component:ApplicantEducationComponent},
  ],
},];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicantRoutingRoutingModule { }
