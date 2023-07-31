import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantProfileDashboardComponent } from './applicant-profile-dashboard.component';

describe('ApplicantProfileDashboardComponent', () => {
  let component: ApplicantProfileDashboardComponent;
  let fixture: ComponentFixture<ApplicantProfileDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantProfileDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantProfileDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
