import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Console, error } from 'console';
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

 
  onSubmit(value: any): Observable<any> {
    console.log("Request Payload:", value);
    return this.http.post(`${this.config.apiUrl}/education`, value);
  }
  applyForLearnership(userId: string): Observable<any> {
    return this.http.post<any>(`${this.config.apiUrl}/applications`, { userId });
  }
  // getAllApplicantions(): Observable<any>  {
  //   return this.http.get(`${this.config.apiUrl}/applications`);
  // }
  getAllApplicantions(): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/applications`);
  }
  getApplicantEducation(): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/education/`);
  }
  getApplicantEducationByUserId(userId: any): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/education/${userId}`);
  }
  
}



