import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadImageRoutingModule } from './upload-image-routing.module';
import { UploadImageComponent } from './upload-image.component';
import { MaterialModule } from 'src/app/modules/material.module';
import { SharedModule } from 'src/app/modules/share.module';

@NgModule({
  declarations: [UploadImageComponent],
  imports: [
    CommonModule,
    UploadImageRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class UploadImagePageModule { }
