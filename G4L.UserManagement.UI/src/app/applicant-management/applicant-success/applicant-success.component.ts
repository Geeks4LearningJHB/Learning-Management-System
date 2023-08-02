import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-success',
  templateUrl: './applicant-success.component.html',
  styleUrls: ['./applicant-success.component.css']
})
export class ApplicantSuccessComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  onDoneClick() {
    this.router.navigate(['/journey-to-a-geek']); // Replace '/attachment' with the actual route path for the AttachmentComponent
  }
}