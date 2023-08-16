import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantionProgressComponent } from './applicantion-progress.component';

describe('ApplicantionProgressComponent', () => {
  let component: ApplicantionProgressComponent;
  let fixture: ComponentFixture<ApplicantionProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantionProgressComponent]
    });
    fixture = TestBed.createComponent(ApplicantionProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
