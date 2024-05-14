import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent {
  selectedFile: File | null = null;
  isLoading = false;

  constructor(private http: HttpClient) { }

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
          // Open the processed image in a new tab
          const newTab = window.open('', '_blank');
          if (newTab) {
            newTab.document.write(`
            <html>
            <head>
              <title>Processed Image</title>
              <style>
                /* CSS styles */
                body {
                  background-color: #545353;
                }
                button {
                  padding: 10px 20px;
                  border-radius: 5px; 
                }
                button:hover {
                  background: #0ab9e6; 
                }
              </style>
            </head>
            <body style="text-align: center;">
              <img src="${imageUrl}" style="max-width: 100%; max-height: 100%; display: block; margin: auto;">
              <div style="margin-top: 20px;">
                <a href="${imageUrl}" download="processed_image.png">
                  <button style="padding: 10px 20px;">Download Image</button>
                </a>
              </div>
            </body>
          </html>
            `);
          } else {
            console.error('Failed to open new tab');
          }
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

  openSourceGuide() {
    window.open('https://github.com/l3miage-belguitr/Xray-project', '_blank');
  }
}
