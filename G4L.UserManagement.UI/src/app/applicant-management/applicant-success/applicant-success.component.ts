import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { TokenService } from 'src/app/user-management/login/services/token.service';
import { ApplicantService } from '../services/applicantService';

export interface Education {
  userId: string;
  mathSubject: string;
  courseOfInterest: string;
  englishMark:string;
  qualifications: string;
}
@Component({
  selector: 'app-applicant-success',
  templateUrl: './applicant-success.component.html',
  styleUrls: ['./applicant-success.component.css']
})
export class ApplicantSuccessComponent implements OnInit {
  educations: Education = {
    userId: '',
    mathSubject: '',
    courseOfInterest: '',
    englishMark: '',
    qualifications: ''
  };

  userId: any;
  constructor(private applicantService: ApplicantService,private tokenService: TokenService, public modalRef: MdbModalRef<any>) { }

  ngOnInit(): void {
    let user: any = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.applicantService.getEducationByUserId(this.userId).subscribe(
      (result) => {
        // Bind Data to the View
        this.educations = result;
        console.log(this.educations);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }



  onDoneClick(): void {
    // Close the modal when "Done" button is clicked
    this.modalRef.close();
  }
}