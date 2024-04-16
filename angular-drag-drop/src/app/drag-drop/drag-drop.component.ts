import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent {
  selectedFile: File | null = null;
  isLoading = false;

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
      this.http.post('http://localhost:8080/detect', formData).subscribe(
        (response: any) => {
          this.isLoading = false;
          this.router.navigate(['/result', { imageUrl: response.processedImageUrl }]);
        },
        error => {
          this.isLoading = false;
          console.error('Upload error', error);
        }
        
      );
      console.log('After subscribe');
    }
  }
  
}
