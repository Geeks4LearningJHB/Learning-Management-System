import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../services/applicantService';
import { any } from 'ramda';
import { TokenService } from 'src/app/user-management/login/services/token.service';

@Component({
  selector: 'app-progress',
  templateUrl: './applicantion-progress.component.html',
  styleUrls: ['./applicantion-progress.component.css']
})
export class ApplicantionProgressComponent implements OnInit {
  profileProgress: number = 0;
  educationProgress: number = 0; // Initialize progress to 0
  userId = any;

  constructor(private applicantService: ApplicantService,  private tokenService: TokenService) {}

  ngOnInit(): void {
    let user = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.getApplicantEducation(this.userId);
    this.onPersonalDetailsSubmit(this.userId)
  }
//personal information
onPersonalDetailsSubmit(userId: any) {
  this.applicantService.onPersonalDetailsSubmit(userId).subscribe(
    (data: any) => {
      const totalFieldCount = 7;
    

      // Log the entire data object received from the service
      console.log("Received data:", data);

      // Replace 'NULL' and null with undefined and normalize field names to lowercase
      const normalizedData = {};
      for (const key in data) {
        const lowercaseKey = key.toLowerCase();
        if (data[key] === 'NULL' || data[key] === null) {
          data[lowercaseKey] = undefined;
        } else {
          data[lowercaseKey] = data[key];
        }
      }

      // Log the values of each field after replacement
      console.log("Name:", data.name);
      console.log("Surname:", data.surname);
      console.log("Email:", data.email);
      console.log("Phone:", data.phone);
      console.log("Race:", data.race);
      console.log("IdNumber:", data.idnumber);
      console.log("Gender:", data.gender);
      const fieldsWithData = [];

      // Check and log fields with data
      if (data.name !== undefined) {
        fieldsWithData.push("Name");
      }
      if (data.surname !== undefined) {
        fieldsWithData.push("Surname");
      }
      if (data.email !== undefined) {
        fieldsWithData.push("Email");
      }
      if (data.phone !== undefined) {
        fieldsWithData.push("Phone");
      }
      if (data.race !== undefined) {
        fieldsWithData.push("Race");
      }
      if (data.gender !== undefined) {
        fieldsWithData.push("Gender");
      }
      if (data.idNumber !== undefined) {
        fieldsWithData.push("IdNumber");
      
      }
      // Calculate the profile progress based on fields with data
      const filledFieldCount = fieldsWithData.length;
      const emptyFieldCount = totalFieldCount - filledFieldCount;
      this.profileProgress = (filledFieldCount / totalFieldCount) * 100;

      // Log fields with data, profile progress, and whether all required fields are filled
      console.log("Fields with data:", fieldsWithData);
      console.log("Profile Progress:", this.profileProgress);

      if (filledFieldCount === totalFieldCount) {
        console.log("All fields are filled");
        this.applicantService.setProfileCompleted(true);
      } else {
        console.log("Not all fields are filled");
        console.log("Empty Field Count:", emptyFieldCount);
        this.applicantService.setProfileCompleted(false);
      }
    }
  );
}


  //education progress
  getApplicantEducation(userId: any) {
    this.applicantService.getEducationByUserId(userId).subscribe(
      (data: any) => {
        const totalFieldCount = 6;
      
  
        // Log the entire data object received from the service
        console.log("Received data:", data);
  
        // Replace 'NULL' and null with undefined and normalize field names to lowercase
        const normalizedData = {};
        for (const key in data) {
          const lowercaseKey = key.toLowerCase();
          if (data[key] === 'NULL' || data[key] === null) {
            data[lowercaseKey] = undefined;
          } else {
            data[lowercaseKey] = data[key];
          }
        }
  
        // Log the values of each field after replacement
        console.log("MathSubject:", data.mathsubject);
        console.log("MathMark:", data.mathmark);
        console.log("EnglishMark:", data.englishmark);
        console.log("Qualifications:", data.qualifications);
        console.log("FieldOfStudy:", data.fieldofstudy);
        console.log("CourseOfInterest:", data.courseofinterest);
  
        // Create an array to hold the names of fields with data
        const fieldsWithData = [];
  
        // Check and log fields with data
        if (data.mathsubject !== undefined) {
          fieldsWithData.push("MathSubject");
        }
        if (data.mathmark !== undefined) {
          fieldsWithData.push("MathMark");
        }
        if (data.englishmark !== undefined) {
          fieldsWithData.push("EnglishMark");
        }
        if (data.qualifications !== undefined) {
          fieldsWithData.push("Qualifications");
        }
        if (data.fieldofstudy !== undefined) {
          fieldsWithData.push("FieldOfStudy");
        }
        if (data.courseofinterest !== undefined) {
          fieldsWithData.push("CourseOfInterest");
        }
  
        // Calculate the education progress based on fields with data
        const filledFieldCount = fieldsWithData.length;
        const emptyFieldCount = totalFieldCount - filledFieldCount;
        this.educationProgress = (filledFieldCount / totalFieldCount) * 100;
  
        // Log fields with data, education progress, and whether all required fields are filled
        console.log("Fields with data:", fieldsWithData);
        console.log("Education Progress:", this.educationProgress);
  
        if (filledFieldCount === totalFieldCount) {
          console.log("All fields are filled");
          this.applicantService.setEducationCompleted(true);
        } else {
          console.log("Not all fields are filled");
          console.log("Empty Field Count:", emptyFieldCount);
          this.applicantService.setEducationCompleted(false);
        }
      }
    );
  }
  
 
}