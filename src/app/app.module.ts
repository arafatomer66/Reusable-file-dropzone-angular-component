import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FileUploadComponent} from './dropzone/fileupload.component';
import {FileSizePipe} from './dropzone/filesize.pipe';
import {DropZoneDirective} from './dropzone/dropzone.directive';

@NgModule({
  declarations: [
    AppComponent , FileUploadComponent , FileSizePipe , DropZoneDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
