import { Component, OnInit, Input } from '@angular/core';
import print from 'print-js';
import { style } from './style';
import { NectarinQuery } from '../variety/state';
import { map } from 'rxjs/operators';
import { INectarinPrintCentroEvaluativo } from '../variety/state/print.interface';
import { NectarinVariety } from '../classes/nectarin-variety';


@Component({
  selector: 'app-variety-print',
  templateUrl: './variety-print.component.html',
  styles: [style]
})
export class VarietyPrintComponent implements OnInit {

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
