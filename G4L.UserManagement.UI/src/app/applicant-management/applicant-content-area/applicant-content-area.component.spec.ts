import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantContentAreaComponent } from './applicant-content-area.component';

describe('ApplicantContentAreaComponent', () => {
  let component: ApplicantContentAreaComponent;
  let fixture: ComponentFixture<ApplicantContentAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantContentAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantContentAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
