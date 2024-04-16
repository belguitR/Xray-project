import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module'; // Make sure this is the correct path
import { AppComponent } from './app.component';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { ResultComponent } from './result/result.component';

@NgModule({
  declarations: [
    AppComponent,
    DragDropComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatButtonModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    AppRoutingModule  // Ensure AppRoutingModule is here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
