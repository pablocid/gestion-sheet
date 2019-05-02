import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { INectarinCentroEvaluativo } from '../../variety/state/state.interface';
import { chain, mean } from 'lodash';
@Component({
  selector: 'app-monitoreo',
  templateUrl: './monitoreo.component.html',
  styleUrls: ['./monitoreo.component.css']
})
export class MonitoreoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MonitoreoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public showXAxis = this.data.showXAxis;
  public showYAxis = this.data.showYAxis;
  public gradient = this.data.gradient;
  public showLegend = this.data.showLegend;
  public showXAxisLabel = this.data.showXAxisLabel;
  public xAxisLabel = this.data.xAxisLabel;
  public showYAxisLabel = this.data.showYAxisLabel;
  public yAxisLabel = this.data.yAxisLabel;
  public colorScheme = this.data.colorScheme;

  public autoScale = this.data.autoScale;

  public series;
  title = this.data.title;
  variedad = this.data.variedad;
  temporada = this.data.temporada;
  centro = this.data.centro;

  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }

}
