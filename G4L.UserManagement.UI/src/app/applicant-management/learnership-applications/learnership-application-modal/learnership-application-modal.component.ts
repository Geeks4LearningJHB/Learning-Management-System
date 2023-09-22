import { Component, OnInit } from '@angular/core';
import { ApplicantService } from '../../services/applicantService';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/user-management/services/user.service';
import { LearnershipApplicationsComponent } from '../learnership-applications.component';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-learnership-application-modal',
  templateUrl: './learnership-application-modal.component.html',
  styleUrls: ['./learnership-application-modal.component.css'],
})
export class LearnershipApplicationModalComponent implements OnInit {
  formModel: any;

  keys = Object.keys;
  user: any | null = null;
  constructor(
    private applicantService: ApplicantService,
    private userService:UserService,
    public modalRef: MdbModalRef<LearnershipApplicationsComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm(this.user);
  }
  buildForm(user?: any) {
    this.formModel = this.formBuilder.group({
      Id: [user?.id],
      MathematicSubject:[{value:user?.mathSubject,disabled: user?.mathSubject }],
      MathematicMarks: [{value:user?.mathMark,disabled: user?.mathMark }],
      EnglishMark: [{value:user?. englishMark,disabled: user?. englishMark }],

      Surname: [user?.surname, [user]],
      IdNumber: [
        { value: user?.idNumber, disabled: user?.idNumber },
        ,
      ],
    });
  }
  close() {
    this.modalRef.close();
}
}
