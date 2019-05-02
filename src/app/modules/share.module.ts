import { NgModule } from '@angular/core';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { MaterialModule } from './material.module';
import { CommonModule } from '@angular/common';
import { OptionsDialogComponent } from '../components/options-dialog/options-dialog.component';
import { AlertDialogComponent } from '../components/alert-dialog/alert-dialog.component';
import { ImagePickerComponent } from '../components/image-picker/image-picker.component';
import { ImageToDataUrlModule } from 'ngx-image2dataurl';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageDialogComponent } from '../components/image-dialog/image-dialog.component';
import { LoadingDialogComponent } from '../components/loading-dialog/loading-dialog.component';
import { GraphDialogComponent } from '../components/graph-dialog/graph-dialog.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

const entry = [
    ConfirmDialogComponent,
    OptionsDialogComponent,
    AlertDialogComponent,
    ImageDialogComponent,
    LoadingDialogComponent,
    GraphDialogComponent
];
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        ImageToDataUrlModule,
        NgxChartsModule
    ],
    exports: [
        ...entry,
        ImagePickerComponent,
        ImageToDataUrlModule,
        FormsModule,
        ReactiveFormsModule
    ],
    entryComponents: [
        ...entry
    ],
    declarations: [
        ...entry,
        ImagePickerComponent
    ],
    providers: [],
})
export class SharedModule { }
