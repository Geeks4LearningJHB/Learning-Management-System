import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearneshipApplicationModalComponent } from './learneship-application-modal.component';

describe('LearneshipApplicationModalComponent', () => {
  let component: LearneshipApplicationModalComponent;
  let fixture: ComponentFixture<LearneshipApplicationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearneshipApplicationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearneshipApplicationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
