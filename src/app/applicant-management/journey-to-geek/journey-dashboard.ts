import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'journey-dashboard',
  templateUrl: './journey-dashboard.component.html',
  styleUrls: ['./journey-dashboard.component.css']
})
export class journeyDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  openProfilePage() {
    this.router.navigateByUrl('applicant-profile-dashboard');
  }
}
