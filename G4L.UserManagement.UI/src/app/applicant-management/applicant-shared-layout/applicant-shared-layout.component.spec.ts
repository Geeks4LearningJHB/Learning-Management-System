import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantSharedLayoutComponent } from './applicant-shared-layout.component';

describe('ApplicantSharedLayoutComponent', () => {
  let component: ApplicantSharedLayoutComponent;
  let fixture: ComponentFixture<ApplicantSharedLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantSharedLayoutComponent]
    });
    fixture = TestBed.createComponent(ApplicantSharedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
