import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantionProgressComponent } from './applicantion-progress.component';

describe('ApplicantionProgressComponent', () => {
  let component: ApplicantionProgressComponent;
  let fixture: ComponentFixture<ApplicantionProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantionProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantionProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
