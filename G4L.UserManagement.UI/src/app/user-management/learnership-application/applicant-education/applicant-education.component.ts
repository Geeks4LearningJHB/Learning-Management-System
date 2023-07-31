import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-education',
  templateUrl: './applicant-education.component.html',
  styleUrls: ['./applicant-education.component.css']
})
export class ApplicantEducationComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

 
   routeToEducation() {
     this.route.navigate(["learnership-application", "personal-information"])

}
}