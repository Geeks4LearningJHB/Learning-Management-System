import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantEducationComponent } from './applicant-education.component';

describe('ApplicantEducationComponent', () => {
  let component: ApplicantEducationComponent;
  let fixture: ComponentFixture<ApplicantEducationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantEducationComponent]
    });
    fixture = TestBed.createComponent(ApplicantEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
