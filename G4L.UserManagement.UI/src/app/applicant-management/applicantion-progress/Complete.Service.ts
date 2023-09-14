import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompletionService {
    private apiUrl = 'https://localhost:44326/api/User/personal3FA85F64-5717-4562-B3FC-2C963F66AFA6';
  private profileCompleted = new BehaviorSubject<boolean>(false);
  private educationCompleted = new BehaviorSubject<boolean>(false);
  private attachmentsCompleted = new BehaviorSubject<boolean>(false);
  profileCompletion: any;
  educationCompletion: any;
  attachmentsCompletion: any;

  constructor() { }

  // Methods to update the completion status

  setProfileCompleted(status: boolean): void {
    this.profileCompleted.next(status);
  }

  setEducationCompleted(status: boolean): void {
    this.educationCompleted.next(status);
  }

  setAttachmentsCompleted(status: boolean): void {
    this.attachmentsCompleted.next(status);
  }

  // Methods to get the completion status

  isProfileCompleted(): Observable<boolean> {
    return this.profileCompleted.asObservable();
  }

  isEducationCompleted(): Observable<boolean> {
    return this.educationCompleted.asObservable();
  }

  isAttachmentsCompleted(): Observable<boolean> {
    return this.attachmentsCompleted.asObservable();
  }
}
