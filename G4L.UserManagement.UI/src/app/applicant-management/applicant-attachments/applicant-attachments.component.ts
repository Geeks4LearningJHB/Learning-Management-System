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
  selectedFiles: File[] = [];
  message: string | undefined;
  sizeError: string | undefined;
  formatError: string | undefined;

  // Variables to track the current error section
  messageSection: string | undefined;
  errorSection: string | undefined;

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
      for (let i = 0; i < newFiles.length; i++) {
        this.selectedFiles.push(newFiles[i]);
      }
    }
    this.messageSection = section; // Set the current section for error messages
    this.errorSection = section; // Set the current section for error divs
    this.clearErrorMessages();
  }

  uploadFiles(section: string) {
    if (this.selectedFiles.length === 0) {
      this.message = 'Please select one or more files to upload.';
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
    let allFilesUploadedSuccessfully = true;

    for (const file of this.selectedFiles) {
      if (file.size > maxSize) {
        this.sizeError = 'File size exceeds the limit of 5 MB.';
        allFilesUploadedSuccessfully = false;
        return;
      }

      const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (!allowedExtensions.includes(fileExtension || '')) {
        this.formatError = 'Invalid file format. Allowed formats: JPEG, PNG, PDF.';
        allFilesUploadedSuccessfully = false;
        return;
      }
    }

    if (allFilesUploadedSuccessfully) {
      // Implement the upload logic for each file based on the section
      this.message = 'File uploaded successfully.';
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

  clearErrorMessages() {
    this.message = undefined;
    this.sizeError = undefined;
    this.formatError = undefined;
  }
}
