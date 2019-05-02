import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { NectarinesStore, NectarinesState } from './nectarines.store';
import { Nectarine } from './nectarine.model';

@Injectable({ providedIn: 'root' })
export class NectarinesQuery extends QueryEntity<NectarinesState, Nectarine> {

  constructor(protected store: NectarinesStore) {
    super(store);
  }

}
