import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ApplicantManagementComponent } from './applicant-management.component';

describe('ApplicantManementComponent', () => {
  let component: ApplicantManagementComponent;
  let fixture: ComponentFixture<ApplicantManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
