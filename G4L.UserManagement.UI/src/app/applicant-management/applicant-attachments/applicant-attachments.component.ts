import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';

@Component({
  selector: 'app-applicant-attachments',
  templateUrl: './applicant-attachments.component.html',
  styleUrls: ['./applicant-attachments.component.css']
})
export class ApplicantAttachmentsComponent implements OnInit {
  sections: string[] = ['section1', 'section2', 'section3']; // Add section names here
  selectedFiles: { [section: string]: File[] } = {}; // Use an object to store files per section
  messages: { [section: string]: string | undefined } = {}; // Error messages per section
  sizeErrors: { [section: string]: string | undefined } = {}; // Size error messages per section
  formatErrors: { [section: string]: string | undefined } = {}; // Format error messages per section

  constructor(private route: Router, private formBuilder: FormBuilder, public modalRef: MdbModalRef<any>) { }

  ngOnInit(): void {}

  onDoneClick(): void {
    this.modalRef.close();
  }

  onSaveClick(): void {
    this.modalRef.close();
  }

  handleFileInput(event: Event, section: string) {
    const inputElement = event.target as HTMLInputElement;
    const newFiles: FileList | null = inputElement.files;
    if (newFiles) {
      this.selectedFiles[section] = []; // Initialize the array for the section
      for (let i = 0; i < newFiles.length; i++) {
        this.selectedFiles[section].push(newFiles[i]); // Add files to the section's array
      }
    }
    this.messages[section] = undefined; // Clear messages for the section
    this.sizeErrors[section] = undefined; // Clear size errors for the section
    this.formatErrors[section] = undefined; // Clear format errors for the section
  }

  uploadFiles(section: string) {
    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
    let allFilesUploadedSuccessfully = true;

    for (const file of this.selectedFiles[section] || []) {
      if (file.size > maxSize) {
        this.sizeErrors[section] = 'File size exceeds the limit of 5 MB.';
        allFilesUploadedSuccessfully = false;
        break; // Exit loop on error
      }

      const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!allowedExtensions.includes(fileExtension || '')) {
        this.formatErrors[section] = 'Invalid file format. Allowed formats: JPEG, PNG, PDF.';
        allFilesUploadedSuccessfully = false;
        break; // Exit loop on error
      }
    }

    if (!allFilesUploadedSuccessfully) {
      this.messages[section] = undefined; // Clear the general message
    } else {
      // Implement the upload logic for each file based on the section
      this.messages[section] = 'File uploaded successfully.';
    }
  }

  getFileSize(size: number): string {
    const fileSizeInKB = Math.round(size / 1024);
    if (fileSizeInKB < 1024) {
      return fileSizeInKB + ' KB';
    } else {
      const fileSizeInMB = (fileSizeInKB / 1024).toFixed(2);
      return fileSizeInMB + ' MB';
    }
  }
}
