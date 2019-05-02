import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface IAlertDialogData {
  header?: string;
  message?: string;
  okLabel?: string;
}

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {
  public ok: string;
  public header: string;
  public message: string;

  constructor(
    public dialogRef: MatDialogRef<AlertDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAlertDialogData
  ) {
    this.ok = this.data.okLabel ? this.data.okLabel : 'OK';
    this.header = this.data.header ? this.data.header : 'Alerta';
    this.message = this.data.message ? this.data.message : '';
  }

  ngOnInit() {
  }

  option(bool) {
    this.dialogRef.close(bool);
  }

}
