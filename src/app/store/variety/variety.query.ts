import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { VarietyStore, VarietyState } from './variety.store';
import { Variety } from './variety.model';

@Injectable({ providedIn: 'root' })
export class VarietyQuery extends QueryEntity<VarietyState, Variety> {

  constructor(protected store: VarietyStore) {
    super(store);
  }

}
