// applicantService.ts

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Console, error } from 'console';
import { any } from 'ramda';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/shared/app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(
    private http: HttpClient,
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
  ) { }

  onPersonalDetailsSubmit(id : any): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/user/${id}`);
  }

  onPersonalDetailsUpdate( body: any) {
    console.log(body);
    return this.http.put(`${this.config.apiUrl}/user/personal`, body);
  }

  onSaveAndClose( body: any) {
    console.log(body);
    return this.http.put(`${this.config.apiUrl}/user/personal`, body);
  }

  onEducationUpdate( body: any) {
    console.log(body);
    return this.http.put(`${this.config.apiUrl}/education`, body);
  }

  onSubmit(value: any): Observable<any> {
    console.log("Post Payload:", value);
    return this.http.post(`${this.config.apiUrl}/education`, value);
  }

  getEducationByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/education/${userId}`);
  }
  
  applyForLearnership(userId: string): Observable<any> {
    return this.http.post<any>(`${this.config.apiUrl}/applications`, { userId });
  }


  // getAllApplicantions(): Observable<any>  {
  //   return this.http.get(`${this.config.apiUrl}/applications`);
  // }

  getAllApplicantions(): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/applications/applications`);
  }
  getApplicantEducation(): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/education`);
  }

  getApplicantEducationByUserId(userId : any): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/education/${userId}`);
  }

  // onPersonalDetailsSubmit(body: personalInformation) {
  //   console.log("Request Payload:", body);
  //   return this.http.put(`${this.config.apiUrl}/user/personal-information`, body);
  // }
  
}

export interface Applicant {
  userId: "";
  name: string;
  surname:string;
  email:string;
  phone:number;
  idNumber: number;
  race:string;
  gender:string;
  disability:string | null;
  englishMark:string;
  mathSubject:string;
  mathMark:string;
  courseOfInterest:string;
  fieldOfStudy:string;
  qualifications:string;
}

export interface Education{
  userId: string;
  mathSubject: string;
  mathMark:string;
  englishMark:string;
  fieldOfStudy:string;
  qualifications:string;
  courseOfInterest:string;
}