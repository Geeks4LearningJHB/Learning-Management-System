import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationProgressComponent } from './application-progress.component';

describe('ApplicationProgressComponent', () => {
  let component: ApplicationProgressComponent;
  let fixture: ComponentFixture<ApplicationProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicationProgressComponent]
    });
    fixture = TestBed.createComponent(ApplicationProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
