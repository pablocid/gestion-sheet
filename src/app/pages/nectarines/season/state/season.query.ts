import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SeasonStore, SeasonState } from './season.store';
import { Season } from './season.model';

@Injectable({ providedIn: 'root' })
export class SeasonQuery extends QueryEntity<SeasonState, Season> {

  constructor(protected store: SeasonStore) {
    super(store);
  }

}
