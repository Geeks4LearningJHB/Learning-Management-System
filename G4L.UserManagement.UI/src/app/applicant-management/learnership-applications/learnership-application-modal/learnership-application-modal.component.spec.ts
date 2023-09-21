import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnershipApplicationModalComponent } from './learnership-application-modal.component';

describe('LearnershipApplicationModalComponent', () => {
  let component: LearnershipApplicationModalComponent;
  let fixture: ComponentFixture<LearnershipApplicationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnershipApplicationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnershipApplicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
