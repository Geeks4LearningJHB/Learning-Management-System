import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../services/applicantService';
import { constants } from 'src/app/shared/global/global.constants';
import { ApplicantEducationComponent } from '../applicant-education/applicant-education.component';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { EnrolComponent } from 'src/app/user-management/enrol/enrol.component';
import { LearnershipApplicationModalComponent } from './learnership-application-modal/learnership-application-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

export interface Applicant {
 id:"";
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

  filteredApplicants: Applicant[] = []; // New array to store filtered applicants


  courseFilterForm!: FormGroup; 
  activeButton: string = 'personal';
  hasApplied: boolean = false;
  modalDialog: MdbModalRef<LearnershipApplicationModalComponent> | null = null;

 

  constructor(
    private applicantService: ApplicantService, private toastr: ToastrService,   private formBuilder: FormBuilder ,   private modalService: MdbModalService, private modalHandler: GoalModalHandlerService<any>
  ) {  this.courseFilterForm = this.formBuilder.group({
    courseOfInterest: ['all'] // Initialize the form control with a default value
  });

  this.courseFilterForm.get('courseOfInterest')?.valueChanges.subscribe((value) => {
    this.filterByStream(value);
  });}

  ngOnInit(): void {
    this.getAllApplicantions();
  }

  getAllApplicantions(){this.applicantService.getAllApplicantions().subscribe(
    (result) => {
      this.applicants = result;
      this.filterByStream('all');
  
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}
  
  filterByStream(stream: string) {
    if (stream === 'all') {
      this.filteredApplicants = [...this.applicants];
    } else {
      this.filteredApplicants = this.applicants.filter(applicant => applicant.courseOfInterest === stream);
    }
  }
  deleteApplication(email: any) {
    this.applicantService.deleteApplication(email).subscribe((response: any) => {
      this.toastr.success(`The application was successfully deleted`);
       this. getAllApplicantions();
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
