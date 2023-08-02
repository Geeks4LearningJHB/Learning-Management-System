import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-applicant-profile-dashboard',
  templateUrl: './applicant-profile-dashboard.component.html',
  styleUrls: ['./applicant-profile-dashboard.component.css']
})
export class ApplicantProfileDashboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

onSubmitApplication(){
  this.router.navigateByUrl('applicant-success')
}
}