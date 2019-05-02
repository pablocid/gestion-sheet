import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-graph-dialog',
  templateUrl: './graph-dialog.component.html',
})
export class GraphDialogComponent {
  public showXAxis;
  public showYAxis;
  public gradient;
  public showLegend;
  public showXAxisLabel;
  public xAxisLabel;
  public showYAxisLabel;
  public yAxisLabel;
  public colorScheme;
  public autoScale;
  public variedad;
  public temporada;
  public centro;
  public series;
  public title;
  public single;
  public view: any[] = [400, 300];

  constructor(
    public dialogRef: MatDialogRef<GraphDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
    this.showXAxis = this.data.showXAxis;
    this.showYAxis = this.data.showYAxis;
    this.gradient = this.data.gradient;
    this.showLegend = this.data.showLegend;
    this.showXAxisLabel = this.data.showXAxisLabel;
    this.xAxisLabel = this.data.xAxisLabel;
    this.showYAxisLabel = this.data.showYAxisLabel;
    this.yAxisLabel = this.data.yAxisLabel;
    this.colorScheme = this.data.colorScheme;
    this.autoScale = this.data.autoScale;
    this.variedad = this.data.variedad;
    this.temporada = this.data.temporada;
    this.centro = this.data.centro;
    this.series = this.data.series;
    this.single = this.data.single;
    this.title = this.data.title;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }

}

