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
  sections: string[] = ['cv', 'id', 'vaccination', 'qualifications'];
  selectedFiles: { [section: string]: File[] } = {};
  selectFilesMessages: { [section: string]: string | undefined } = {};
  uploadMessages: { [section: string]: string | undefined } = {};
  sizeErrors: { [section: string]: string | undefined } = {};
  formatErrors: { [section: string]: string | undefined } = {};

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
      this.selectedFiles[section] = [];
      for (let i = 0; i < newFiles.length; i++) {
        this.selectedFiles[section].push(newFiles[i]);
      }
    }
    this.selectFilesMessages[section] = undefined;
    this.uploadMessages[section] = undefined;
    this.sizeErrors[section] = undefined;
    this.formatErrors[section] = undefined;
  }

  uploadFiles(section: string) {
    const maxSize = 5 * 1024 * 1024; // 5 MB in bytes
    let allFilesUploadedSuccessfully = true;

    if (!this.selectedFiles[section] || this.selectedFiles[section].length === 0) {
      this.selectFilesMessages[section] = 'Please select one or more files to upload.';
      return;
    }

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
    }

    if (allFilesUploadedSuccessfully) {
      // Implement the upload logic for each file based on the section
      this.uploadMessages[section] = 'File uploaded successfully.';
    } else {
      this.uploadMessages[section] = undefined;
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
