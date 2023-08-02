import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applicant-attachments',
  templateUrl: './applicant-attachments.component.html',
  styleUrls: ['./applicant-attachments.component.css']
})
export class ApplicantAttachmentsComponent implements OnInit {
  fileForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.fileForm = this.formBuilder.group({
      fileInput: [null]
    });
  }

  handleFileInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.item(0);
    this.fileForm.get('fileInput')?.setValue(file);
  }

  uploadFile() {
    const fileToUpload = this.fileForm.get('fileInput')?.value;
    if (fileToUpload) {
      // Perform the file upload here, send the file to the server or perform any other required action.
      console.log('Uploading file:', fileToUpload);
      // Example:
      // this.http.post('YOUR_UPLOAD_URL', fileToUpload).subscribe(response => {
      //   console.log('Upload successful!', response);
      // });
    }
  }

  ngOnInit(): void {
  }
  openCompleteAppication(){
    this.router.navigateByUrl('applicant-profile-dashboard');
  }
  routeToEducation(){
    this.router.navigateByUrl('applicant-education');
  }
}
