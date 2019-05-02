import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { NectarinState } from './state.interface';


export function createInitialState(): NectarinState {
  return {
    centro_evaluativo: [],
    especie: undefined,
    id: undefined,
    ncv: undefined,
    nombre_ingreso: undefined,
    pmg: undefined,
    reference: undefined,
    schema: undefined,
    season: undefined,
    status: undefined,
    status_evaluativo: undefined,
    status_interes: undefined,
    temporada: undefined,
    _id: undefined,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'nectarin' })
export class NectarinStore extends Store<NectarinState> {

  constructor() {
    super(createInitialState());
  }

}
