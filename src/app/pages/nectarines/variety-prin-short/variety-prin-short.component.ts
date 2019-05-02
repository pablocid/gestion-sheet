import { Component, OnInit, Input } from '@angular/core';
import { NectarinQuery } from '../variety/state';
import { INectarinPrintCentroEvaluativo } from '../variety/state/print.interface';
import print from 'print-js';
import { NectarinVariety } from '../classes/nectarin-variety';

const style = `
.title {
  text-align: center;
}
.content-table {
  text-align: center;
}

.main-print {
  font-size:12px;
}

.table-style {
  width: 100%;
}

 .header {
  border: 2px solid black;
}

.defectos {
  font-size: 9px;
}

tr {
  margin: 0px;
  padding: 0px;
}

`;
@Component({
  selector: 'app-variety-prin-short',
  templateUrl: './variety-prin-short.component.html',
  // styleUrls: ['./variety-prin-short.component.css']
  styles: [ style ]
})
export class VarietyPrinShortComponent implements OnInit {
  constructor(
    private nectQ: NectarinQuery
  ) { }
  public variety = this.nectQ.transform();
  // public centro: any = this.variety.centro_evaluativo[0];

  @Input() nectarin: NectarinVariety;
  @Input() i: number;

  ngOnInit() {

  }

  public captureScreen(info: { id: string, name: string }) {

    print({
      printable: info.id, type: 'html',
      style: style
      // css: 'assets/css/print-page.css',
      // scanStyles: false
    });
    return;
  }

}
