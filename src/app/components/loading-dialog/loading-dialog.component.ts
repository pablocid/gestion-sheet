import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface ILoadingDialogData {
  header?: string;
  message?: string;
  okLabel?: string;
}

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.css']
})
export class LoadingDialogComponent implements OnInit {
  public message: string;
  constructor(
    public dialogRef: MatDialogRef<LoadingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ILoadingDialogData
  ) {
    this.message = this.data.message ? this.data.message : 'cargando ...';
  }

  ngOnInit() {
  }

  option(bool) {
    this.dialogRef.close(bool);
  }

}
