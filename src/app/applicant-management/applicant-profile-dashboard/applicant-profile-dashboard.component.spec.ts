import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantProfileDashbordComponent } from './personal-information.component';

describe('ApplicantProfileDashbordComponent', () => {
  let component: ApplicantProfileDashbordComponent;
  let fixture: ComponentFixture<ApplicantProfileDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantProfileDashbordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantProfileDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
