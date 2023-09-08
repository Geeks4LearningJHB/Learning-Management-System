import { Component, OnInit } from '@angular/core';
import { Applicant, ApplicantService } from '../services/applicantService';
import { constants } from 'src/app/shared/global/global.constants';
import { ApplicantEducationComponent } from '../applicant-education/applicant-education.component';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { LearneshipApplicationModalComponent } from './learneship-application-modal/learneship-application-modal.component';

@Component({
  selector: 'app-learnership-applications',
  templateUrl: './learnership-applications.component.html',
  styleUrls: ['./learnership-applications.component.css']
})
export class LearnershipApplicationsComponent implements OnInit {
  applicants: Applicant[] = [];
  // applicantions: any;
  // userRole: any;

  constructor(
    private applicantService: ApplicantService, private modalHandler: GoalModalHandlerService<any>
  ) {}

  ngOnInit(): void {
    this.applicantService.getAllApplicantions().subscribe(
      (result) => {
        // Bind Data to the View
        this.applicants = result;
        console.log(this.applicants)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  openEducationApplication(): void {
    this.modalHandler.openMdbModal<LearneshipApplicationModalComponent>({
      component: LearneshipApplicationModalComponent,
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
  
}
