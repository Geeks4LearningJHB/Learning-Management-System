// progress-tracker.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompletionService } from './Complete.Service';

@Component({
  selector: 'app-progress',
  templateUrl: './applicantion-progress.component.html',
  styleUrls: ['./applicantion-progress.component.css']
})

export class ApplicantionProgressComponent implements OnInit {
  profileProgress: number = 0;
  educationProgress: number = 0;
  attachmentsProgress: number = 0;

  constructor(private http: HttpClient,) {} // Inject the HttpClient service

  ngOnInit(): void {
    // Implement logic to calculate progress for each form
    this.calculateProfileProgress();
    this.calculateEducationProgress();
    this.calculateAttachmentsProgress();
  }

  calculateProfileProgress() {
    // Make an HTTP GET request to fetch user profile data from your Node.js server
    this.http.get('/api/User/personal{any}').subscribe((data: any) => {
      // Assuming data is an object representing the user's profile
      if (data && data.firstName && data.lastName && data.email && data.phonenumber && data.IdNumber && data.Gender && data.Race) {
        // All fields are filled
        this.profileProgress = 100;
      } else {
        // Calculate the progress based on the number of filled fields
        const filledFieldCount = Object.values(data).filter(field => !!field).length;
        const totalFieldCount = 8; // Total number of fields in the "Profile" section
      
        // Define progress values for different levels
        const progressValues = [0, 25, 50, 75]; // Customize these values as needed
      
        // Calculate the progress level based on filled fields
        const progressLevel = Math.min(Math.floor((filledFieldCount / totalFieldCount) * progressValues.length), progressValues.length - 1);
      
        // Set the profileProgress based on the progress level
        this.profileProgress = progressValues[progressLevel];
      }
      
    });
  }

  calculateEducationProgress() {
    // Make an HTTP GET request to fetch user education data from your Node.js server
    this.http.get('/api/Education/education{userId}').subscribe((data: any) => {
      // Assuming data is an object representing education information
      if (data && data.mathSubject && data.mathMark && data.englishMark && data.postMatricQualification && data.FieldOfStudy && data.CourseOfInterest) {
        // All fields are filled
        this.educationProgress = 100;
      } else {
        // Calculate the progress based on the number of filled fields
        const filledFieldCount = Object.values(data).filter(field => !!field).length;
        const totalFieldCount = 6; // Total number of fields in the "Education" section
      
        // Calculate the progress as a percentage
        this.educationProgress = (filledFieldCount / totalFieldCount) * 100;
      }
      
    });
  }

  calculateAttachmentsProgress() {
    // Make an HTTP GET request to fetch user attachments data from your Node.js server
    this.http.get('/api/attachments').subscribe((data: any) => {
      // Assuming data is an object representing attachments
      if (data && data.cv && data.idCopy && data.vaccinationCert && data.qualifications) {
        // All fields are filled
        this.attachmentsProgress = 100;
      } else {
        // Calculate the progress based on the number of filled fields
        const filledFieldCount = Object.values(data).filter(field => !!field).length;
        const totalFieldCount = 4; // Total number of fields in the "Attachments" section
      
        // Calculate the progress as a percentage
        this.attachmentsProgress = (filledFieldCount / totalFieldCount) * 100;
      }
      
    });
  }
}
