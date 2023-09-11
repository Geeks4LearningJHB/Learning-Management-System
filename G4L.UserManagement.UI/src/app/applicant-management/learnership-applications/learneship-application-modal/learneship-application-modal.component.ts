import { Component, OnInit } from '@angular/core';
import { ApplicantService, Education } from '../../services/applicantService';

@Component({
  selector: 'app-learneship-application-modal',
  templateUrl: './learneship-application-modal.component.html',
  styleUrls: ['./learneship-application-modal.component.css']
})
export class LearneshipApplicationModalComponent implements OnInit {

  educations: Education[] = [];
  keys = Object.keys;
  
  constructor(    private applicantService: ApplicantService,) { }

  ngOnInit(): void {
    this.applicantService. getApplicantEducation().subscribe(
      (result) => {
        // Bind Data to the View
        this.educations = result;
        console.log(this.educations)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }


 
}
