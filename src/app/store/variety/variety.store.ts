import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Variety } from './variety.model';

export interface VarietyState extends EntityState<Variety> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'variety_' })
export class VarietyStore extends EntityStore<VarietyState, Variety> {

  constructor() {
    super();
  }

}

