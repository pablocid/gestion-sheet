import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { SeasonQuery } from '../season/state';
import { NectarinService } from '../variety/state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-varieties',
  templateUrl: './varieties.component.html',
  styleUrls: ['./varieties.component.css']
})
export class VarietiesComponent implements OnInit {

  public opts = this.seasonQ.getActive().varlist.map(x => {
    return { id: x.id, value: x.ncv };
  });

  constructor(
    private seasonQ: SeasonQuery,
    private nectarS: NectarinService,
    private router: Router
  ) { }

  public season$ = this.seasonQ.selectActive();
  public varieties$ = this.seasonQ.selectActive().pipe(map(x => x.varlist));

  varSelected($event) {
    this.nectarS.setVariety($event);
  }

  ngOnInit() { }

  goBack() {
    this.router.navigate(['/nectarines']);
  }

}
