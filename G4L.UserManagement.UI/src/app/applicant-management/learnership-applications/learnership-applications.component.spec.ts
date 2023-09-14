import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnershipApplicationsComponent } from './learnership-applications.component';

describe('LearnershipApplicationsComponent', () => {
  let component: LearnershipApplicationsComponent;
  let fixture: ComponentFixture<LearnershipApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnershipApplicationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnershipApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
