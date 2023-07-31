import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  routeToEducation() {
    this.route.navigate(["learnership-application", "education"])

  }

}
