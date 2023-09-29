import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Console, error } from 'console';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/shared/app-config/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  constructor(
    private http: HttpClient,

    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
  ) { }

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
    console.log('Post Payload:', value);
    return this.http.post(`${this.config.apiUrl}/education`, value);
  }

  getEducationByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/education/${userId}`);
  }

  applyForLearnership(userId: string): Observable<any> {
    return this.http.post<any>(`${this.config.apiUrl}/applications`, {
      userId,
    });
  }

  sendEmail(userId: string): Observable<any> {
    return this.http.post<any>(`${this.config.apiUrl}/email`, { userId });
  }

  
  getAllApplicantions(): Observable<any>  {

    return this.http.get(`${this.config.apiUrl}/applications`);
  }

  getApplicantEducation(): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/education`);
  }

  getApplicantEducationByUserId(userId: any): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/education/education${userId}`);

  }

  onPersonalDetailsSubmit(id: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/user/${id}`);
  }


  deleteApplication(email: any) {
    return this.http.delete(`${this.config.apiUrl}/applications?email=${email}`);
  }

  getApplication(userId: any): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/applications/${userId}`);
  }
  
  documentUpload(body: any): Observable<any> {
    return this.http.post<any>(`${this.config.apiUrl}/applicantattachments`, body);
  }
  
  getDocumentsByUserId(userId: any): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/applicantattachments/${userId}`);
  }

  setProfileCompleted(arg0: boolean) {
    // Implement this method as needed
  }

  setEducationCompleted(arg0: boolean) {
    // Implement this method as needed
  }

  getProfileByUserId(userId: any) {
    // Implement this method as needed
  }
}


