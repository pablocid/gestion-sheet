import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Nectarine } from './nectarine.model';

export interface NectarinesState extends EntityState<Nectarine> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'nectarines' })
export class NectarinesStore extends EntityStore<NectarinesState, Nectarine> {

  constructor() {
    super();
  }

}

