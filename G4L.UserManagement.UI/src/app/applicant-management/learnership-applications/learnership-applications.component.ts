import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../services/applicantService';
import { constants } from 'src/app/shared/global/global.constants';
import { ApplicantEducationComponent } from '../applicant-education/applicant-education.component';
import { GoalModalHandlerService } from 'src/app/goal-management/services/modals/goal-modal-handler.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';

import { LearnershipApplicationModalComponent } from './learnership-application-modal/learnership-application-modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';


export interface Applicant {
  id: '';
  userId: '';
  name: string;
  surname: string;
  email: string;
  phone: number;
  idNumber: number;
  race: string;
  gender: string;
  disability: string | null;
  englishMark: string;
  mathSubject: string;
  mathMark: string;
  courseOfInterest: string;
  fieldOfStudy: string;
  qualifications: string;
  cvFileName: string;
  cvFilePath: string;
  idFileName: string;
  idFilePath: string;
  qualificationsFileName: string;
  qualificationsFilePath: string;
  vaccinationFileName: string;
  vaccinationFilePath: string;
  createdDate: string;
 
}
@Component({
  selector: 'app-learnership-applications',
  templateUrl: './learnership-applications.component.html',
  styleUrls: ['./learnership-applications.component.css'],
})
export class LearnershipApplicationsComponent implements OnInit {
  applicants: Applicant[] = [];
  filteredApplicants: Applicant[] = []; 
  page = 1;
  pageSize = 10;
  totalPages!: number;
  searchQuery: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  filterForm!: FormGroup;
  modalDialog: MdbModalRef<LearnershipApplicationModalComponent> | null = null;



  constructor(
    private applicantService: ApplicantService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: MdbModalService,
    private modalHandler: GoalModalHandlerService<any>
  ) {this.filterForm = this.formBuilder.group({
    courseOfInterest: [''],
    searchQuery: [''],
    startDate: [null],
  endDate: [null], 
  });

  }

  ngOnInit(): void {
    this.getList();
  
  }
  
  getList() {
    const filters = this.filterForm.value;
    this.applicantService.getList(
      this.page,
      this.pageSize,
      filters.courseOfInterest,
      filters.searchQuery,
      filters.startDate,
      filters.endDate
    ).subscribe(
      (result) => {
        this.applicants = result;
        this.totalPages = Math.ceil(result.length / this.pageSize); // Use total count from backend
        this.filteredApplicants = [...result];
        console.log(this.filteredApplicants);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  
 

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.getList();
    }
  }
  
  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.getList();
    }
  }
  onPageChange(event: PageEvent) {
    console.log('Page change event:', event);
    this.page = event.pageIndex + 1; 
    this.pageSize = event.pageSize;
    console.log('New page:', this.page, 'New page size:', this.pageSize);
    this.getList();
  }
  applyFilters() {
    const filters = this.filterForm.value;
  
    this.startDate = filters.startDate; 
    this.endDate = filters.endDate;    
    console.log('Start Date:', this.startDate); 
    console.log('End Date:', this.endDate);    
   
    this.filteredApplicants = this.applicants.filter((applicant) => {
     
     
      return (
        (filters.courseOfInterest
          ? applicant.courseOfInterest.includes(filters.courseOfInterest)
          : true) &&
        (filters.searchQuery
          ? applicant.name.includes(filters.searchQuery) ||
            applicant.surname.includes(filters.searchQuery) ||
            applicant.email.includes(filters.searchQuery) ||
            applicant.phone.toString().includes(filters.searchQuery)
          : true) &&
        (filters.startDate
          ? new Date(applicant.createdDate) >= new Date(filters.startDate)
          : true) &&
        (filters.endDate
          ? new Date(applicant.createdDate) <= new Date(filters.endDate)
          : true)
      );
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
    this.modalDialog = this.modalService.open(
      LearnershipApplicationModalComponent,
      {
        animation: true,
        backdrop: true,
        containerClass: 'modal top fade modal-backdrop',
        data: { user: user, editCrucialInfo: true },
        ignoreBackdropClick: false,
        keyboard: true,
        modalClass: 'modal-xl modal-dialog-centered',
      }
    );

    this.modalDialog.onClose.subscribe((isUpdated: boolean) => {});
  }
}
