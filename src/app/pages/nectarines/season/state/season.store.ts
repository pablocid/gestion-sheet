import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Season } from './season.model';

export interface SeasonState extends EntityState<Season> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'season' })
export class SeasonStore extends EntityStore<SeasonState, Season> {

  constructor() {
    super();
  }

}

