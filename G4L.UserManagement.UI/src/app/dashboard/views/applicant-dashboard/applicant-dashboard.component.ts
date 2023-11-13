import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { any } from 'ramda';
import { ApplicantService } from 'src/app/applicant-management/services/applicantService';
import { TokenService } from 'src/app/user-management/login/services/token.service';

@Component({
  selector: 'app-applicant-dashboard',
  templateUrl: './applicant-dashboard.component.html',
  styleUrls: ['./applicant-dashboard.component.css']
})

export class ApplicantDashboardComponent implements OnInit {
  
  userId = "";
  showSecondDashboard: boolean = false;
  applicants: {
    name: string;
    surname: string;
  } = { name: '', surname: '' };
  

  constructor(private router: Router, private applicantService: ApplicantService, private tokenService: TokenService) { }

  ngOnInit(): void {
    let user = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.getApplication(this.userId);
  
  }
  openLearneshipApplication() {
    this.router.navigateByUrl('profile');
  } 

  getApplication(userId: any) {
    this.applicantService.getApplication(this.userId).subscribe(
      (result) => {
        this.applicants = result;
        console.log(result);

        // Check if userId is not null
        if (this.userId) {
          this.showSecondDashboard = true;
        } else {
          this.showSecondDashboard = false;
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
