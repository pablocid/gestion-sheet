import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ID } from '@datorama/akita';
import { SeasonService, SeasonQuery } from './state';
import { NectarinService } from '../variety/state';

@Component({
  selector: 'app-season',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class SeasonComponent implements OnInit {

  constructor(
    private seasonS: SeasonService,
    private seasonQ: SeasonQuery,
    private nectarinS: NectarinService,
    private router: Router
  ) {

  }

  public seasons$ = this.seasonQ.selectAll();
  public loading$ = this.seasonQ.selectLoading();

  ngOnInit() {
    this.seasonS.get();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  goToSpecie(id: ID) {
    this.seasonS.setActive(id);
    this.nectarinS.unsetVariety();
    this.router.navigate(['nectarines/varieties']);
  }

  async sync(id: string) {
    console.log('id', id);
    await this.seasonS.syncData(id);
  }

  goToUploadImage() {
    this.router.navigate(['upload-image']);
  }

}
