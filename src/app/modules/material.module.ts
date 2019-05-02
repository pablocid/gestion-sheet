import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatMenuModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatBottomSheetModule,
  MatGridListModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatTableModule,
  MatTabsModule,
  MatAutocompleteModule
} from '@angular/material';
import { FlexLayoutModule} from '@angular/flex-layout';
const mat = [
  FlexLayoutModule,
  MatMenuModule, MatButtonModule, MatToolbarModule, MatIconModule, MatDialogModule,
  MatInputModule, MatListModule, MatProgressSpinnerModule, MatSnackBarModule,
  MatBottomSheetModule, MatGridListModule, MatCardModule, MatDatepickerModule,
  MatNativeDateModule, MatTableModule, MatTabsModule,
  MatFormFieldModule, MatAutocompleteModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...mat
  ],
  exports: [
    ...mat
  ]
})
export class MaterialModule { }
