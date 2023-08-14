  import { Component, OnInit } from '@angular/core';
  // import { Router } from '@angular/router';
  import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

  @Component({
    selector: 'app-applicant-success',
    templateUrl: './applicant-success.component.html',
    styleUrls: ['./applicant-success.component.css']
  })
  export class ApplicantSuccessComponent implements OnInit {

    constructor(public modalRef: MdbModalRef<any>) { }

    ngOnInit(): void {
    }


    onDoneClick(): void {
      // Close the modal when "Done" button is clicked
      this.modalRef.close();
    }
  }