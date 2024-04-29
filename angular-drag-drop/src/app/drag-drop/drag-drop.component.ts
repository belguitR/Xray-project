import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent {
  selectedFile: File | null = null;
  isLoading = false;
  processedImageUrl: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log('File selected');
  }

  upload() {
    console.log('Upload button clicked');
    if (this.selectedFile) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
      console.log('Before subscribe');
      this.http.post('http://localhost:8080/detect', formData, { responseType: 'blob' }).pipe(
        tap((response: Blob) => {
          this.isLoading = false;
          const imageUrl = URL.createObjectURL(response);
          this.processedImageUrl = imageUrl;
          // Open the processed image in a new tab
          window.open(imageUrl, '_blank');
        })
      ).subscribe(
        () => {
          console.log('Request completed');
        },
        (error) => {
          this.isLoading = false;
          console.error('Upload error', error);
        }
      );
      console.log('After subscribe');
    }
  }
}
