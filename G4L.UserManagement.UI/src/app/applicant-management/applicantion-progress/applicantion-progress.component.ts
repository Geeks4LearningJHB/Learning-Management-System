import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../services/applicantService';
import { TokenService } from 'src/app/user-management/login/services/token.service';

@Component({
  selector: 'app-progress',
  templateUrl: './applicantion-progress.component.html',
  styleUrls: ['./applicantion-progress.component.css']
})
export class ApplicantionProgressComponent implements OnInit {
  profileProgress: number = 0;
  educationProgress: number = 0;
  overallProgress: number = 0;
  userId: number | undefined;

  constructor(
    private applicantService: ApplicantService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getDecodeToken().id;
    this.calculateProfileProgress();
    this.calculateEducationProgress();
    this.calculateAttachmentProgress();
  }

  private calculateProgress(data: any, fieldsToCheck: string[], totalFieldCount: number): number {
    const filledFieldCount = fieldsToCheck.reduce((count, field) => (data[field] !== undefined && data[field] !== null ? count + 1 : count), 0);
    const progress = (filledFieldCount / totalFieldCount) * 100;
  
    console.log("Fields with data:", fieldsToCheck.filter(field => data[field] !== undefined && data[field] !== null));
    console.log("Progress:", progress);
  
    return progress;
  }

  calculateProfileProgress(): void {
    this.applicantService.onPersonalDetailsSubmit(this.userId).subscribe((data: any) => {
      const fieldsToCheck = ["name", "surname", "email", "phone", "race", "gender", "idNumber"];
      this.profileProgress = this.calculateProgress(data, fieldsToCheck, 7);
    });
  }

  calculateEducationProgress(): void {
    this.applicantService.getEducationByUserId(this.userId).subscribe((data: any) => {
      const fieldsToCheck = ["qualifications", "mathSubject", "mathMark", "englishMark", "fieldOfStudy", "courseOfInterest"];
      this.educationProgress = this.calculateProgress(data, fieldsToCheck, 6);
    });
  }

  calculateAttachmentProgress(): void {
    let filePathCount = 0; 
  
    this.applicantService.getIdDocumentsByUserId(this.userId).subscribe((idData: any) => {
      if (idData.filePath) {
        filePathCount++;
        console.log(idData)
      }
    });
  
    this.applicantService.getCvDocumentsByUserId(this.userId).subscribe((cvData: any) => {
      if (cvData.filePath) {
        filePathCount++;
        console.log(cvData)
      }
    });
  
    this.applicantService.getVaccinationDocumentsByUserId(this.userId).subscribe((vaccinationData: any) => {
      if (vaccinationData.filePath) {
        filePathCount++;
        console.log(vaccinationData)
      }
    });
  
    this.applicantService.getQualificationDocumentsByUserId(this.userId).subscribe((qualificationData: any) => {
      if (qualificationData.filePath) {
        filePathCount++;
        console.log(qualificationData)
      }
  
      // Calculate the overallProgress based on filePathCount
      if (filePathCount === 0) {
        this.overallProgress = 0;
      } else if (filePathCount === 1) {
        this.overallProgress = 25;
      } else if (filePathCount === 2) {
        this.overallProgress = 50;
      } else if (filePathCount === 3) {
        this.overallProgress = 75;
      } else {
        this.overallProgress = 100;
      }
    });
  }
}  