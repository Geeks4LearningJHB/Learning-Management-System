import { ComponentFixture, TestBed } from '@angular/core/testing';

import {journeyDashboardComponent } from './journey-dashboard';

describe('ApplicantDashboardComponent', () => {
  let component: journeyDashboardComponent;
  let fixture: ComponentFixture<journeyDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ journeyDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(journeyDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
