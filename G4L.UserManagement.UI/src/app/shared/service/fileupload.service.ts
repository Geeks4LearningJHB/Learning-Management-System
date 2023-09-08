import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastrService } from 'ngx-toastr';
import { FileUpload } from 'src/app/leave-management/models/file-upload';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private basePath = '/uploads';

  app = initializeApp({
    apiKey: "AIzaSyB-BseEKZTt8lwxLwwyT8QcIEtuDo-Ft_M",
    authDomain: "learner-management-system.firebaseapp.com",
    databaseURL: "https://learner-management-system-default-rtdb.firebaseio.com",
    projectId: "learner-management-system",
    storageBucket: "learner-management-system.appspot.com",
    messagingSenderId: "153948337848",
    appId: "1:153948337848:web:f6fc12e8e622c4a06e264d",
    measurementId: "G-QYL4SBB7XP"
  });

  private storage = getStorage(this.app);

  constructor(private toastr: ToastrService) {}

  async genericUploadToStorage(fileUpload: FileUpload, fileType: string) {
    const filePath = `${this.basePath}/${fileType}/${fileUpload?.file?.name}`;
    const storageRef = ref(this.storage, filePath);

    if (!fileUpload.file) return null;

    try {
      // Upload the file
      const snapshot = await uploadBytes(storageRef, fileUpload.file);

      // Get the download URL for the uploaded file
      const downloadURL = await getDownloadURL(snapshot.ref);

      fileUpload.url = downloadURL;
      this.toastr.success('File uploaded successfully', 'Success');
      return fileUpload;
    } catch (error) {
      console.error('Error uploading file:', error);
      this.toastr.error('Failed to upload file', 'Error');
      throw error;
    }
  }
}
