import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../services/applicantService';
import { constants } from 'src/app/shared/global/global.constants';
import { ApplicantEducationComponent } from '../applicant-education/applicant-education.component';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EnrolComponent } from 'src/app/user-management/enrol/enrol.component';
import { LearnershipApplicationModalComponent } from './learnership-application-modal/learnership-application-modal.component';

export interface Applicant {
  userId: "";
  name: string;
  surname:string;
  email:string;
  phone:number;
  idNumber: number;
  race:string;
  gender:string;
  disability:string | null;
  englishMark:string;
  mathSubject:string;
  mathMark:string;
  courseOfInterest:string;
  fieldOfStudy:string;
  qualifications:string;
}
@Component({
  selector: 'app-learnership-applications',
  templateUrl: './learnership-applications.component.html',
  styleUrls: ['./learnership-applications.component.css']
})
export class LearnershipApplicationsComponent implements OnInit {
  applicants: Applicant[] = [];
  showPersonalDetails = true;
  showEducationDetails = false;
  activeButton: string = 'personal';
  modalDialog: MdbModalRef<LearnershipApplicationModalComponent> | null = null;
  // applicantions: any;
  // userRole: any;

  constructor(
    private applicantService: ApplicantService,    private modalService: MdbModalService, private modalHandler: GoalModalHandlerService<any>
  ) {}

  ngOnInit(): void {
    this.applicantService.getAllApplications().subscribe(
      (result) => {
        this.applicants = result;
    
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  showPersonal() {
    this.showPersonalDetails = true;
    this.showEducationDetails = false;
    this.activeButton = 'personal';
  }

  showEducation() {
    this.showPersonalDetails = false;
    this.showEducationDetails = true;
    this.activeButton = 'education';
  }



  openEducationModal(): void {
    this.modalHandler.openMdbModal<ApplicantEducationComponent>({
      component: ApplicantEducationComponent,
      data: null,
      ignoreBackdropClick: true,
      width: 50,
    });
  }
  openDialog(user?: any) {
    this.modalDialog = this.modalService.open(LearnershipApplicationModalComponent, {
      animation: true,
      backdrop: true,
      containerClass: 'modal top fade modal-backdrop',
      data: { user: user, editCrucialInfo: true },
      ignoreBackdropClick: false,
      keyboard: true,
      modalClass: 'modal-xl modal-dialog-centered',
    });

    this.modalDialog.onClose.subscribe((isUpdated: boolean) => {
    
    });
  }
  
}
