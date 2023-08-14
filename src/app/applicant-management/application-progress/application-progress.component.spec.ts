import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationProgressComponent } from './application-progress.component';

describe('ApplicantionProgressComponent', () => {
let component: ApplicationProgressComponent;
let fixture: ComponentFixture<ApplicationProgressComponent>;

beforeEach(async () => {
await TestBed.configureTestingModule({
declarations: [ApplicationProgressComponent],
 }).compileComponents();
 });

beforeEach(() => {
fixture = TestBed.createComponent(ApplicationProgressComponent);
component = fixture.componentInstance;
fixture.detectChanges();
 });
it('should create', () => {
expect(component).toBeTruthy();
});
});