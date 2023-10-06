import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UploadService } from 'src/app/shared/service/fileupload.service';
import { FileUpload } from 'src/app/leave-management/models/file-upload';
import { TokenService } from 'src/app/user-management/login/services/token.service';

@Component({
  selector: 'app-applicant-attachments',
  templateUrl: './applicant-attachments.component.html',
  styleUrls: ['./applicant-attachments.component.css']
})
export class ApplicantAttachmentsComponent implements OnInit {
  fileUrl: string = '';
  userId: any;
  uploadedFileName: string = '';
  sections: string[] = ['cv', 'id', 'vaccination', 'qualifications'];
  selectedFiles: { [section: string]: File[] } = {};
  selectFilesMessages: { [section: string]: string | undefined } = {};
  uploadMessages: { [section: string]: string | undefined } = {};
  sizeErrors: { [section: string]: string | undefined } = {};
  formatErrors: { [section: string]: string | undefined } = {};
  loggedInUser: any;
  @Input() modalData: any;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    public modalRef: MdbModalRef<any>,
    private uploadService: UploadService,
    private tokenService: TokenService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    let user = this.tokenService.getDecodeToken();
    this.userId = user.id;
    this.loggedInUser = { id: this.modalData.userId };
  }

  onSaveClick(): void {
    this.modalRef.close();
  }

  handleFileInput(event: Event, section: string) {
    const inputElement = event.target as HTMLInputElement;
    const newFiles: FileList | null = inputElement.files;

    if (newFiles && newFiles.length > 0) {
      this.selectedFiles[section] = Array.from(newFiles);
    } else {
      this.selectedFiles[section] = [];
    }

    this.selectFilesMessages[section] = undefined;
    this.uploadMessages[section] = undefined;
    this.sizeErrors[section] = undefined;
    this.formatErrors[section] = undefined;
  }

  async uploadSectionFiles(section: string) {
    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
    let allFilesUploadedSuccessfully = true;

    if (!this.selectedFiles[section] || this.selectedFiles[section].length === 0) {
      this.selectFilesMessages[section] = 'Please select one or more files to upload.';
      allFilesUploadedSuccessfully = false;
    } else {
      for (const file of this.selectedFiles[section]) {
        if (file.size > maxSize) {
          this.sizeErrors[section] = 'File size exceeds the limit of 5 MB.';
          allFilesUploadedSuccessfully = false;
          break;
        }

        const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase();
        if (!allowedExtensions.includes(fileExtension || '')) {
          this.formatErrors[section] = 'Invalid file format. Allowed formats: JPEG, PNG, PDF.';
          allFilesUploadedSuccessfully = false;
          break;
        }

        const fileUpload: FileUpload = {
          file: file,
          url: '',
          key: undefined,
          name: '',
          uploadProgress: undefined,
        };

        try {
          const data = await this.uploadService.genericUploadToStorage(fileUpload, section);
          const fileUrl = data?.url;
          if (data?.file) {
            this.uploadedFileName = data.file.name;
          } else {
            console.error('Error: File name is not available in data.');
            // Handle the case where the name is not available in data.
          }
          console.log('Data returned by file upload:', data);
          console.log('name:', data?.file?.name);
          if (fileUrl) {
            const userId = this.loggedInUser.id;
            this.documentUpload(userId, section, fileUrl);
          } else {
            console.error('Error: File URL is not available.');
          }
        } catch (error) {
          console.error('Error:', error);
          this.handleError(error);
        }

        this.uploadMessages[section] = 'File uploaded successfully.';
      }
    }

    if (allFilesUploadedSuccessfully) {
      this.uploadMessages[section] = 'All files uploaded successfully.';
    } else {
      this.uploadMessages[section] = undefined;
    }
  }

  // Implement error handling based on your application's requirements
  handleError(error: any) {
    console.error('Error:', error);
    // Handle the error here as needed
  }

  // Integrate the document upload function
  documentUpload(userId: any, section: string, fileUrl: string) {
    const apiUrls = {
      cv: 'https://localhost:44326/api/CvDocuments',
      id: 'https://localhost:44326/api/IdDocuments',
      vaccination: 'https://localhost:44326/api/VaccinationDocuments',
      qualifications: 'https://localhost:44326/api/QualificationsDocuments'
    };

    const data = {
      userId: this.userId,
      fileName: this.uploadedFileName,
      filePath: fileUrl,
      
    };

    // // Send the data to the API using HttpClient
    // this.http.post(apiUrls[this.sections], data).subscribe(
    //   (response: any) => {
    //     console.log('File metadata sent to the SQL database:', response);
    //     // Handle success, e.g., update UI or show a success message
    //   },
    //   (error: any) => {
    //     console.error('Error:', error);
    //     // Handle the error here as needed
    //     this.handleError(error);
    //   }
    
  }
}
