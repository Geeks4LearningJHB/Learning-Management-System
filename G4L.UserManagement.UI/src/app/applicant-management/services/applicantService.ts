// applicantService.ts

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/shared/app-config/app-config.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(
    private http: HttpClient,
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig
  ) { }

  onSubmit(value: any): Observable<any> {
    console.log("Request Payload:", value);
    return this.http.post(`${this.config.apiUrl}/education`, value);
  }

  submitFormUsingHttpGet(value: any): Observable<any> {
    console.log("Get Payload:", value);
    return this.http.get(`${this.config.apiUrl}/education`, value);
  }
  
  onPersonalDetailsSubmit(body: personalInformation) {
    console.log("Request Payload:", body);
    return this.http.put(`${this.config.apiUrl}/user/personal-information`, body);
  }

  getEducationByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/education/userId/${userId}`);
  }
}

export interface personalInformation {
      Firstname : string
      Surname: string
      Email: string
      Phone: number
      IdNumber: string
      Disability : string | null
      Gender: string
      Race: string
}
