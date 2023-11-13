import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Console, error } from 'console';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/shared/app-config/app-config.interface';
import { APP_SERVICE_CONFIG } from 'src/app/shared/app-config/app-config.service';
import { Applicant } from '../learnership-applications/learnership-applications.component';

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  getPersonalDetails(userId: any) {
    throw new Error('Method not implemented.');
  }
  getTableDataByUserId(userId: { <T>(fn: (a: T) => boolean, list: readonly T[]): boolean; <T>(fn: (a: T) => boolean): (list: readonly T[]) => boolean; }, tableName: string) {
    throw new Error('Method not implemented.');
  }
  setAllDocumentsCompleted(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  setQualificationDocumentCompleted(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  setVaccinationDocumentCompleted(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  setCvDocumentCompleted(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
  setIdDocumentCompleted(arg0: boolean) {
    throw new Error('Method not implemented.');
  }
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

  checkDataExistence(formData: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.config.apiUrl}/education`, formData);
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

  onPersonalDetailsSubmit(id: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/user/${id}`);
  }


  deleteApplication(email: any) {
    return this.http.delete(`${this.config.apiUrl}/applications?email=${email}`);
  }

  getApplication(userId: any): Observable<any>  {
    return this.http.get(`${this.config.apiUrl}/applications/${userId}`);
  }
  
  getQualificationDocumentsByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/qualificationsDocuments/${userId}`)
  }

  getIdDocumentsByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/idDocuments/${userId}`)
  }
  getVaccinationDocumentsByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/vaccinationDocuments/${userId}`)
  }
  getCvDocumentsByUserId(userId: any): Observable<any> {
    return this.http.get(`${this.config.apiUrl}/cvDocuments/${userId}`)
  }
  setProfileCompleted(arg0: boolean) {
    // Implement this method as needed
  }

  setEducationCompleted(arg0: boolean) {
    // Implement this method as needed
  }

  getList(
    page: number,
    pageSize: number,
    courseOfInterest: string,
    searchQuery: string,
    startDate: string | null,
    endDate: string | null
  ) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('courseOfInterest', courseOfInterest)
      .set('searchQuery', searchQuery);

    if (startDate && endDate) {
      const startDateObject = new Date(startDate);
      const endDateObject = new Date(endDate);

      if (!isNaN(startDateObject.getTime()) && !isNaN(endDateObject.getTime())) {
        params = params
          .set('startDate', startDateObject.toISOString())
          .set('endDate', endDateObject.toISOString());
      }
    }

    console.log('params:', params);

    return this.http.get<any[]>(`${this.config.apiUrl}/applications`, { params });
  }
}


