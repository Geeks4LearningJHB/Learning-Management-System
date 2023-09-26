import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { UploadService } from 'src/app/shared/service/fileupload.service';
import { FileUpload } from 'src/app/leave-management/models/file-upload'; // Import the FileUpload model
import { ApplicantService } from '../services/applicantService';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-applicant-attachments',
  templateUrl: './applicant-attachments.component.html',
  styleUrls: ['./applicant-attachments.component.css']
})
export class ApplicantAttachmentsComponent implements OnInit {
  sections: string[] = ['cv', 'id', 'vaccination', 'qualifications'];
  selectedFiles: { [section: string]: File[] } = {};
  selectFilesMessages: { [section: string]: string | undefined } = {};
  uploadMessages: { [section: string]: string | undefined } = {};
  sizeErrors: { [section: string]: string | undefined } = {};
  formatErrors: { [section: string]: string | undefined } = {};
  logggedInUser: any;
  @Input() modalData: any;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    public modalRef: MdbModalRef<any>,
    private applicantService: ApplicantService,
    private uploadService: UploadService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.logggedInUser = {}; // Initialize the loggedInUser object
    this.logggedInUser.id = this.modalData.userId;
  }

  onDoneClick(): void {
    this.modalRef.close();
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

  async uploadFiles(section: string) {
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
  
        // Create a FileUpload object
        const fileUpload: FileUpload = {
          file: file,
          url: '',
          key: undefined,
          name: '',
          uploadProgress: undefined
        };
  
        console.log(fileUpload);
  
        try {
          const data = await this.uploadService.genericUploadToStorage(fileUpload, section);
          const fileUrl = data?.url;
          console.log('Data returned by file upload:', data);
  
          // Send the file URL to your backend service using HttpClient
          const userId = this.logggedInUser.id; // Replace with your actual user identifier
          this.http.post('/storeFileUrl', { userId, fileUrl }).subscribe(
            (userUpdateResponse: any) => {
              console.log('User updated:', userUpdateResponse);
              this.logggedInUser.id_url = fileUrl;
              // Other code to update the user or perform additional actions
            },
            (error: any) => {
              console.error('Error storing file URL in the database', error);
              // Handle errors as needed
            }
          );
        } catch (error) {
          console.error('Error:', error);
          // Handle errors as needed
        }
  
        // File uploaded successfully, so set the success message
        this.uploadMessages[section] = 'File uploaded successfully.';
      }
    }
  
    if (allFilesUploadedSuccessfully) {
      // Display a success message if all files uploaded successfully
      this.uploadMessages[section] = 'All files uploaded successfully.';
    } else {
      // Clear the message if there are errors
      // this.uploadMessages[section] = undefined;
    }
  }
}  
// ...
(error: any) => {
  console.error('Error storing file URL in the database', error);
  if (error && error.message) {
    // Check if error.message is a valid JSON string
    try {
      const errorMessage = JSON.parse(error.message);
      console.error('Detailed error message:', errorMessage);
    } catch (parseError) {
      // If parsing fails, handle it as a regular string
      console.error('Detailed error message parsing failed:', parseError);
    }
  } else {
    // Handle error without a message property as a regular string
    console.error('Detailed error message is unavailable.');
  }
  // Handle errors as needed
}
// ...