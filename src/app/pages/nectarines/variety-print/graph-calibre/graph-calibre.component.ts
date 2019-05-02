import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graph-calibre2',
  templateUrl: './graph-calibre.component.html',
  styleUrls: ['./graph-calibre.component.css']
})
export class GraphCalibrePrintComponent implements OnInit {
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
  ) {
  }
  @Input() cosecha;
  @Input() data;

  ngOnInit() {
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

}
