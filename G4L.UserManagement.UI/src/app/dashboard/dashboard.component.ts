import { Component, OnInit } from '@angular/core';
//import { Chart } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { constants } from '../shared/global/global.constants';
import { Roles } from '../shared/global/roles';
Chart.register(...registerables);
import { Observable, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isAdmin: boolean | undefined;
  isTrainer: boolean | undefined;
  isLearner: boolean | undefined;

  subject = new BehaviorSubject<any[]>(['Thapelo', 'Mg']);
  
  obsData = this.subject.asObservable();

  constructor() { }

  ngOnInit(): void {
    const role = sessionStorage.getItem(constants.role);
    this.determinRole(role);
    this.obsData.subscribe(data =>{
      console.log(data);
     }
    )
  }

  addData(){
    const name = 'Anton';
    const oldData = this.subject.getValue();
    const newData = [...oldData, name];
    this.subject.next(newData);
  }

  determinRole(role: string | null) {
    switch (role) {
      case Roles.Super_Admin:
      case Roles.Admin:
        this.isAdmin = true;
        break;
      case Roles.Trainer:
        this.isTrainer = true;
        break;
      case Roles.Learner:
        this.isLearner = true;
        break;
    }
  }

}
